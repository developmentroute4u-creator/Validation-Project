import sys
import subprocess

# Try to install pypdf2 if not available
try:
    import PyPDF2
except ImportError:
    print("Installing PyPDF2...")
    subprocess.check_call([sys.executable, "-m", "pip", "install", "PyPDF2", "--quiet"])
    import PyPDF2

# Extract PDF text
pdf_path = r"j:\Research\The Strategic Convergence of Empathetic User Research and Outcome-Based Marketing_ A Comprehensive Analysis of Business Viability in the AI Era.pdf"

try:
    with open(pdf_path, 'rb') as file:
        reader = PyPDF2.PdfReader(file)
        text = ""
        
        print(f"Total pages: {len(reader.pages)}\n")
        print("="*80)
        
        for i, page in enumerate(reader.pages):
            page_text = page.extract_text()
            text += f"\n\n--- PAGE {i+1} ---\n\n{page_text}"
            print(f"Page {i+1} extracted")
        
        # Save to file
        with open(r"j:\Research\pdf_extracted_content.txt", "w", encoding="utf-8") as output:
            output.write(text)
        
        print("\n" + "="*80)
        print(f"✓ Extraction complete! Saved to: pdf_extracted_content.txt")
        print(f"✓ Total characters: {len(text)}")
        
except Exception as e:
    print(f"Error: {e}")
