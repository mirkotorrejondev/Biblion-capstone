import { NextRequest, NextResponse } from "next/server";
import { openLibraryService } from "@/lib/services/openLibraryService";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const q = searchParams.get("q") || "";
  const title = searchParams.get("title") || "";
  const subject = searchParams.get("subject") || "";
  const publisher = searchParams.get("publisher") || "";
  const author = searchParams.get("author") || "";
  const place = searchParams.get("place") || "";
  const isbn = searchParams.get("isbn") || "";
  const person = searchParams.get("person") || "";
  const page = searchParams.get("page") || "1";
  const limit = searchParams.get("limit") || "10";
  const sort = searchParams.get("sort") || "";

  try {
    const data = await openLibraryService.searchBooks({
      q,
      title,
      subject,
      publisher,
      author,
      place,
      isbn,
      person,
      page,
      limit,
      sort,
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
    console.error("Error fetching search:", error);
    return NextResponse.json(
      { error: "Failed to fetch search data" },
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
