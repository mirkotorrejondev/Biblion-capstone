import { NextRequest, NextResponse } from "next/server";
import { openLibraryService } from "@/lib/services/openLibraryService";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const bibkeys = searchParams.get("bibkeys");
  const format = searchParams.get("format") || "json";
  const jscmd = searchParams.get("jscmd") || "data";

  if (!bibkeys) {
    return NextResponse.json(
      { error: "bibkeys parameter is required" },
      { status: 400 },
    );
  }

  try {
    const data = await openLibraryService.getBook({
      bibkeys,
      format,
      jscmd,
    });

    return NextResponse.json(data, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  } catch (error) {
    console.error("Error fetching from OpenLibrary:", error);
    return NextResponse.json(
      { error: "Failed to fetch book data" },
      { status: 500 },
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
