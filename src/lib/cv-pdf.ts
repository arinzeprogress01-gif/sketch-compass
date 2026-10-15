import { cvFilename, type CvDocument, type CvSection } from "@/data/cv";

export async function downloadCv(document: CvDocument, sections: CvSection[], template: "classic" | "modern", size: "a4" | "letter") {
  const { jsPDF } = await import("jspdf");
  const pdf = new jsPDF({ unit: "mm", format: size });
  const width = pdf.internal.pageSize.getWidth();
  const height = pdf.internal.pageSize.getHeight();
  const margin = 20;
  let y = margin;
  const line = (text: string, fontSize: number, bold = false) => {
    pdf.setFont("helvetica", bold ? "bold" : "normal"); pdf.setFontSize(fontSize);
    // jsPDF's built-in font supports Latin text; normalize punctuation consistently.
    const normalized = text.replace(/[—–]/g, "-").replace(/[‘’]/g, "'").replace(/[“”]/g, '"').replace(/·/g, " | ");
    const lines = pdf.splitTextToSize(normalized, width - margin * 2) as string[];
    for (const row of lines) { if (y + fontSize * 0.45 > height - margin) { pdf.addPage(); y = margin; } pdf.text(row, margin, y); y += fontSize * 0.45; }
  };
  line(document.name, template === "modern" ? 25 : 22, true); y += 2;
  line(document.headline, 12); y += 2;
  line([document.email, document.phone, document.location].filter(Boolean).join(" | "), 9); y += 7;
  if (document.summary.trim()) { line("PROFILE", 11, true); y += 2; line(document.summary, 10); y += 6; }
  for (const section of sections) {
    if (!document.sections[section].length) continue;
    if (y > height - 40) { pdf.addPage(); y = margin; }
    line(section.toUpperCase(), 11, true); y += 3;
    for (const item of document.sections[section]) { line(item.title, 11, true); if (item.subtitle) line(item.subtitle, 9); if (item.description) { y += 1; line(item.description, 10); } y += 5; }
  }
  pdf.save(cvFilename(document.name));
}