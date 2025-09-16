
const PDFDocument = require('pdfkit-table');

module.exports  = function (jsonData, res) {
   
 


    const doc = new PDFDocument({ margin: 30, size: "A4" });
      
      doc.pipe(res);

      // Title
      doc
        .fontSize(18)
        .text("Student Academic Report", { align: "center", underline: true });
      doc.moveDown(1);

      // Student Info
      doc.fontSize(12).text(`Name: ${jsonData.name}`);
      doc.text(`Email: ${jsonData.email}`);
      doc.text(`Matric No: ${jsonData.matricNo}`);
      doc.text(`Session Admitted: ${jsonData.academicSessionAdmitted}`);
      doc.moveDown(2);

      // Loop through academic details
      jsonData.details.forEach((detail, idx) => {
        doc
          .fontSize(14)
          .text(
            `Level: ${detail.level} | Academic Session: ${detail.academicSession} | Status: ${detail.studentStatus}`,
            { underline: true }
          );
        doc.moveDown(0.5);

        // Build table for courses
        const table = {
          headers: [
            { label: "Course Title", property: "courseTitle", width: 150 },
            { label: "Score", property: "courseScore", width: 60 },
            { label: "Grade", property: "courseGrade", width: 80 },
            { label: "Resit Score", property: "resitScore", width: 80 },
            { label: "Resit Grade", property: "resitGrade", width: 80 },
          ],
          datas: detail.courses.map((course) => ({
            courseTitle: course.courseTitle,
            courseScore: course.courseScore || "-",
            courseGrade: course.courseGrade || "-",
            resitScore: course.resitScore || "-",
            resitGrade: course.resitGrade || "-",
          })),
        };

        doc.table(table, {
          prepareHeader: () => doc.font("Helvetica-Bold").fontSize(10),
          prepareRow: (row, i) =>
            doc.font("Helvetica").fontSize(9),
        });

        doc.moveDown(2);
      });

   

    // Customize this based on your JSON structure
 
    doc.end();

    
}





// Generate PDF
