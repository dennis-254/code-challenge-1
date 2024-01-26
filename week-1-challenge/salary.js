const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


Number.prototype.remove = function (digitsToRemove) {
  const strNumber = this.toFixed(15).toString(); 
  const decimalIndex = strNumber.indexOf('.');
  return parseFloat(strNumber.slice(0, decimalIndex + 1 + digitsToRemove));
};

function calculateNetSalary(basicSalary, benefits) {
  if (typeof basicSalary !== 'number' || typeof benefits !== 'number' || isNaN(basicSalary) || isNaN(benefits)) {
    throw new Error('Invalid input. Please provide valid numeric values for basicSalary and benefits.');
  }

  const taxRate = 0.06;
  const nhifRate = 0.06;
  const nssfRate = 0.06;

  const grossSalary = basicSalary + benefits;

  const tax = grossSalary * taxRate;
  const nhif = grossSalary * nhifRate;
  const nssf = grossSalary * nssfRate;

  const netSalary = grossSalary - (tax + nhif + nssf);

  return {
    grossSalary,
    tax,
    nhif,
    nssf,
    netSalary
  };
}

rl.question('Enter Basic Salary: ', (basicSalary) => {
  rl.question('Enter Benefits: ', (benefits) => {
    try {
      const result = calculateNetSalary(parseFloat(basicSalary), parseFloat(benefits));
      console.log("\nNet Salary Calculation Results:");
      console.log("Gross Salary: $", result.grossSalary.remove(2));
      console.log("Tax: $", result.tax.remove(2));
      console.log("NHIF Deductions: $", result.nhif.remove(2));
      console.log("NSSF Deductions: $", result.nssf.remove(2));
      console.log("Net Salary: $", result.netSalary.remove(2));
    } catch (error) {
      console.error(error.message);
    } finally {
      rl.close();
    }
  });
});
