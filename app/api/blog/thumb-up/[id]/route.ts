export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  // You can add any additional logic here if needed
  return Response.json({ errno: 0, data: { id } });
}
