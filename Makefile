# Makefile for Resume PDF Generation
# Usage: make resume

.PHONY: resume clean help

# Generate PDF resume from markdown
resume: public/resume.md public/resume-compact.css
	@echo "Generating PDF resume..."
	pandoc public/resume.md -o public/resume.pdf --pdf-engine=weasyprint --css=public/resume-compact.css
	@echo "✓ PDF generated: public/resume.pdf"
	@mdls -name kMDItemNumberOfPages public/resume.pdf

# Clean generated PDF
clean:
	@echo "Cleaning generated PDF..."
	rm -f public/resume.pdf
	@echo "✓ Cleaned"

# Help target
help:
	@echo "Resume Makefile Commands:"
	@echo "  make resume - Generate PDF resume from markdown"
	@echo "  make clean  - Remove generated PDF"
	@echo "  make help   - Show this help message"
	@echo ""
	@echo "Requirements: pandoc, weasyprint"
	@echo "Install with: pip install weasyprint"
