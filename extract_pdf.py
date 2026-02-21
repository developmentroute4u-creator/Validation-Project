import sys
import os

try:
    from PyPDF2 import PdfReader
except ImportError:
    print("PyPDF2 not installed. Attempting to install...")
    os.system(f"{sys.executable} -m pip install PyPDF2")
    from PyPDF2 import PdfReader

pdf_path = r"j:\Research\The Strategic Convergence of Empathetic User Research and Outcome-Based Marketing_ A Comprehensive Analysis of Business Viability in the AI Era.pdf"

reader = PdfReader(pdf_path)
text = ""

for page in reader.pages:
    text += page.extract_text() + "\n\n"

# Save to a text file
with open(r"j:\Research\pdf_content.txt", "w", encoding="utf-8") as f:
    f.write(text)

print(f"Extracted {len(reader.pages)} pages")
print("Content saved to pdf_content.txt")
