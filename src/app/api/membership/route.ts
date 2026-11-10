import { isApplicationId, validateMembership } from "@/lib/membership";

const maxBodySize = 12_000;
const unavailable = "Applications are temporarily unavailable. Please try again later.";

function json(body: object, status: number) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request) {
  if (request.headers.get("content-type")?.split(";")[0].trim() !== "application/json") {
    return json({ message: "Submit the application from the website form." }, 415);
  }
  if (Number(request.headers.get("content-length")) > maxBodySize) {
    return json({ message: "This application exceeds the allowed size." }, 413);
  }

  let data: unknown;
  try {
    const body = await request.text();
    if (Buffer.byteLength(body) > maxBodySize) return json({ message: "This application exceeds the allowed size." }, 413);
    data = JSON.parse(body);
  } catch {
    return json({ message: "The application could not be read." }, 400);
  }

  if (!data || typeof data !== "object" || Array.isArray(data)) {
    return json({ message: "The application could not be read." }, 400);
  }
  const input = data as Record<string, unknown>;
  if (!isApplicationId(input.applicationId)) return json({ message: "This application is missing a valid reference." }, 400);

  const { values, errors } = validateMembership(input);
  if (Object.keys(errors).length) return json({ message: "Review the highlighted fields.", errors }, 422);

  const endpoint = process.env.MEMBERSHIP_SHEETS_URL;
  const secret = process.env.MEMBERSHIP_SHEETS_SECRET;
  if (!endpoint || !/^https:\/\/script\.google\.com\/macros\/s\/[\w-]+\/exec$/.test(endpoint) || !secret || secret.length < 32) {
    return json({ message: unavailable }, 503);
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret, applicationId: input.applicationId, values, privacyAcknowledged: true }),
      signal: AbortSignal.timeout(15_000),
      cache: "no-store",
    });
    if (response.ok) {
      const result = await response.json();
      if (result?.ok === true && result.applicationId === input.applicationId) {
        return json({ applicationId: result.applicationId }, 201);
      }
    }
  } catch {
    // The browser keeps the application and reference for a safe retry.
  }
  return json({ message: "We could not confirm receipt. Your details are still in the form. Please retry." }, 502);
}
