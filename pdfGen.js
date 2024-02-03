const fs = require('fs');
const PDFDocument = require('pdfkit-table');

module.exports  = function (jsonData, outputPath = 'output.pdf') {
    const doc = new PDFDocument({margin: 10, size: 'A4' });
    const stream = fs.createWriteStream(outputPath);

    doc.pipe(stream);

    const data = jsonData?.details?.map( s => {
        const studentInfoTwo = s.twoHundredLevel;
        const studentInfoThree = s.threeHundredLevel;
        const studentInfoFour = s.fourHundredLevel;
        const studentInfoFive = s. fiveHundredLevel;
        const studentInfoSix = s.sixHundredLevel;
        const studentElective = s.studentElectives;
        console.log(studentElective);

        const processedStudentTwo = studentInfoTwo.map(o => {
            return [
                o.courseTitle,  o.courseScore,  o.courseGrade
            ]
          

        

        })
        const table1 = {
            title :  "200 level", 
            headers: ["Student courses", "student score", "student grades"],
            rows: processedStudentTwo
        
        }
        doc.table(table1, {width: 600});
        doc.moveDown();

            
        const processedStudentThree = studentInfoThree.map(o => {
            return [
                o.courseTitle,  o.courseScore, o.courseGrade
            ]
          
        })
const table2 = {
    title :  "300 level", 
    headers: ["Student courses", "student score", "student grades"],
    rows: processedStudentThree

}
doc.table(table2, {width: 600});
doc.moveDown(1);
        

         
         const processedStudentFour = studentInfoFour.map(o => {
            return [
                o.courseTitle,  o.courseScore,  o.courseGrade
            ]
          
        })
        const table3 = {
            title :  "400 level", 
            headers: ["Student courses", "student score", "student grades"],
            rows: processedStudentFour
        
        }
        doc.table(table3, {width: 600});
        doc.moveDown();
         const processedStudentFive = studentInfoFive.map(o => {
            return [
                o.courseTitle,  o.courseScore,  o.courseGrade
            ]
          
        })
        const table4 = {
            title :  "500 level", 
            headers: ["Student courses", "student score", "student grades"],
            rows: processedStudentFive
        
        }
        doc.table(table4, {width: 600});
        doc.moveDown();

         const processedStudentSix = studentInfoSix.map(o => {
            return [
                o.courseTitle,  o.courseScore,  o.courseGrade
            ]
          
          
        })
        console.log(processedStudentSix)
        const table5 = {
            title :  "600 level", 
            headers: ["Student courses", "student score", "student grades"],
            rows: processedStudentSix
        
        }
        console.log(table5);
        doc.table(table5, {
            width: 600
        
        });
        doc.moveDown();
        const processedElectives = studentElective.map(o => {
            return [
                o.courseTitle, o.courseCode,  o.courseScore,  o.courseGrade
            ]
          
          
            
        })
        console.log(studentElective)
        console.log(processedElectives)

        const table6 = {
            title :  "Special Electives", 
            headers: ["course Title ", "course Code", "student score", "student grades"],
            rows: processedElectives
        
        }
        console.log(table6);
        doc.table(table6, {
            width: 800
        
        });
        doc.moveDown();
    })
    doc.text(data)

    // Customize this based on your JSON structure
 
    doc.end();

    console.log(`PDF generated successfully at ${outputPath}`);
}





// Generate PDF
