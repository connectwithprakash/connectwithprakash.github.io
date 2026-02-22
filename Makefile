# Makefile for Resume PDF Generation
# Usage: make resume

.PHONY: resume cv all clean help

# Default: generate both PDFs
all: resume cv

# Generate PDF resume from markdown
resume: public/resume.md public/resume-compact.css
	@echo "Generating PDF resume..."
	pandoc public/resume.md -o public/resume.pdf --pdf-engine=weasyprint --css=public/resume-compact.css
	@echo "✓ PDF generated: public/resume.pdf"
	@mdls -name kMDItemNumberOfPages public/resume.pdf

# Generate PDF CV from markdown
cv: public/cv.md public/resume-compact.css
	@echo "Generating PDF CV..."
	pandoc public/cv.md -o public/cv.pdf --pdf-engine=weasyprint --css=public/resume-compact.css
	@echo "✓ PDF generated: public/cv.pdf"
	@mdls -name kMDItemNumberOfPages public/cv.pdf

# Clean generated PDFs
clean:
	@echo "Cleaning generated PDFs..."
	rm -f public/resume.pdf public/cv.pdf
	@echo "✓ Cleaned"

# Help target
help:
	@echo "Resume/CV Makefile Commands:"
	@echo "  make        - Generate both resume and CV PDFs"
	@echo "  make resume - Generate PDF resume from markdown"
	@echo "  make cv     - Generate PDF CV from markdown"
	@echo "  make clean  - Remove generated PDFs"
	@echo "  make help   - Show this help message"
	@echo ""
	@echo "Requirements: pandoc, weasyprint"
	@echo "Install with: pip install weasyprint"
