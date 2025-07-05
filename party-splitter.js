//  document.addEventListener('DOMContentLoaded', () => {
//     const membersList = document.getElementById('members-list');
//     const resultsDiv = document.getElementById('results');
//     const addMemberBtn = document.getElementById('add-member-btn');
//     const calculateBtnFair = document.getElementById('calculate-btn-fair');
//     const calculateBtnFifty = document.getElementById('calculate-btn');
//     let memberCount = 0;

//     // Add member functionality
//     addMemberBtn.addEventListener('click', () => {
//         memberCount++;
//         const memberDiv = document.createElement('div');
//         memberDiv.classList.add('mb-3');
//         memberDiv.innerHTML = `
//             <label for="member-${memberCount}" class="form-label">Tên thành viên #${memberCount}</label>  &nbsp; <button type="button" style="margin-bottom: 0.4em" class="btn btn-danger btn-sm mt-2 remove-member-btn">Xóa </button> &nbsp  &nbsp <label for="member-${memberCount}-is-50-payer" class="form-label">Chọn trả 50%</label>
//             <input type="radio" name="is-50-payer" id="member-${memberCount}-is-50-payer" class="form-check-input">
//             <input type="text" class="form-control mb-2" id="member-${memberCount}-name" placeholder="Nhập tên">
//             <label for="member-${memberCount}-expense" class="form-label">Đã ứng (VND) (ví dụ: 100k = 100000)</label>
//             <input type="number" class="form-control mb-2" id="member-${memberCount}-expense" placeholder="Nhập số tiền">

//         `;
//         membersList.appendChild(memberDiv);

//         // Add event listener for removing a member
//         memberDiv.querySelector('.remove-member-btn').addEventListener('click', () => {
//             memberDiv.remove();
//             memberCount--;
//         });
//     });

//     // Function to handle calculations
//     const calculateExpenses = (isFiftyPercent = false) => {
//         const members = [];
//         let totalExpenses = 0;
//         let fiftyPayer = null;

//         for (let i = 1; i <= memberCount; i++) {
//             const name = document.getElementById(`member-${i}-name`).value;
//             const expense = parseFloat(document.getElementById(`member-${i}-expense`).value) || 0;
//             const isFiftyPayer = document.getElementById(`member-${i}-is-50-payer`).checked;

//             members.push({ name, expense });

//             totalExpenses += expense;
//             if (isFiftyPayer) {
//                 fiftyPayer = { name, expense, index: i - 1 };
//             }
//         }

//         if (isFiftyPercent && !fiftyPayer) {
//             alert('Vui lòng chọn một người để trả 50% tổng chi phí.');
//             return;
//         }

//         let fiftyPercentTotal = isFiftyPercent ? totalExpenses / 2 : 0;
//         let remainingTotal = isFiftyPercent ? totalExpenses - fiftyPercentTotal : totalExpenses;
//         let equalShareForOthers = remainingTotal / (isFiftyPercent ? (members.length - 1) : members.length);

//         const transactions = [];

//         members.forEach((member, index) => {
//             let balance;
//             if (isFiftyPercent && index === fiftyPayer.index) {
//                 balance = member.expense - fiftyPercentTotal;
//             } else {
//                 balance = member.expense - equalShareForOthers;
//             }
//             transactions.push({ name: member.name, balance });
//         });

//         // Display total expenses and average per person
//         resultsDiv.innerHTML = `<h4>Tổng chi: ${totalExpenses.toFixed(2)} VND</h4>`;
//         if (isFiftyPercent) {
//             resultsDiv.innerHTML += `<h4>${fiftyPayer.name} phải trả 50% tổng chi phí: ${fiftyPercentTotal.toFixed(2)} VND</h4>`;
//             resultsDiv.innerHTML += `<h4>Trung bình mỗi người còn lại phải trả: ${equalShareForOthers.toFixed(2)} VND</h4>`;
//         } else {
//             resultsDiv.innerHTML += `<h4>Trung bình mỗi người phải trả: ${equalShareForOthers.toFixed(0)} VND</h4>`;
//         }

//         // Calculate who owes whom
//         let lenders = transactions.filter(t => t.balance > 0);
//         let borrowers = transactions.filter(t => t.balance < 0);

//         resultsDiv.innerHTML += '<h4>Chi tiết thanh toán</h4>';

//         while (lenders.length && borrowers.length) {
//             lenders.sort((a, b) => b.balance - a.balance);
//             borrowers.sort((a, b) => a.balance - b.balance);

//             const lender = lenders[0];
//             const borrower = borrowers[0];

//             const amount = Math.min(lender.balance, Math.abs(borrower.balance));
//             resultsDiv.innerHTML += `<p><strong>${borrower.name}</strong> trả cho <strong>${lender.name}</strong> ${amount.toFixed(1)} VND</p>`;

//             lender.balance -= amount;
//             borrower.balance += amount;

//             if (lender.balance < 0.1) lender.balance = 0;  // Handle small decimals
//             if (borrower.balance > -0.1) borrower.balance = 0;  // Handle small decimals

//             if (lender.balance === 0) lenders.shift();
//             if (borrower.balance === 0) borrowers.shift();
//         }

//         resultsDiv.innerHTML += `<p style="color: green;">Đã Chia Đồng Đều</p>`;
//     };

//     // Calculate equally for all members
//     calculateBtnFair.addEventListener('click', () => {
//         calculateExpenses(false);
//     });

//     // Calculate with 50% payer
//     calculateBtnFifty.addEventListener('click', () => {
//         calculateExpenses(true);
//     });
// });

// update==============================================================
document.addEventListener("DOMContentLoaded", () => {
  const membersList = document.getElementById("members-list");
  const resultsDiv = document.getElementById("results");
  const addMemberBtn = document.getElementById("add-member-btn");
  const calculateBtnFair = document.getElementById("calculate-btn-fair");
  const calculateBtnFifty = document.getElementById("calculate-btn");
  let memberCount = 0;

  // Function to format number with thousand separators
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  // Function to parse formatted number (remove dots)
  const parseFormattedNumber = (str) => {
    return parseFloat(str.replace(/\./g, "")) || 0;
  };

  // Function to convert number to Vietnamese text
  const numberToVietnameseText = (num) => {
    const units = ["", "ngàn", "triệu", "tỷ"];
    const numbers = [
      "không",
      "một",
      "hai",
      "ba",
      "bốn",
      "năm",
      "sáu",
      "bảy",
      "tám",
      "chín",
    ];

    if (num === 0) return "không đồng";

    let numStr = num.toString();
    let result = "";
    let unitIndex = 0;

    while (numStr.length > 0) {
      let chunk = parseInt(numStr.slice(-3)) || 0;
      if (chunk > 0) {
        let chunkText = "";
        let hundreds = Math.floor(chunk / 100);
        let tens = Math.floor((chunk % 100) / 10);
        let ones = chunk % 10;

        if (hundreds > 0) {
          chunkText += numbers[hundreds] + " trăm";
        }
        if (tens > 0 || ones > 0) {
          if (hundreds > 0) chunkText += " ";
          if (tens === 0 && hundreds > 0) {
            chunkText += "lẻ ";
          } else if (tens === 1) {
            chunkText += "mười";
          } else if (tens > 1) {
            chunkText += numbers[tens] + " mươi";
          }
          if (ones > 0) {
            if (tens > 0) chunkText += " ";
            if (tens === 1) {
              if (ones === 5) chunkText += "lăm";
              else if (ones === 1) chunkText += "mốt";
              else chunkText += numbers[ones];
            } else {
              if (ones === 5 && tens > 0) chunkText += "lăm";
              else if (ones === 1 && tens > 0) chunkText += "mốt";
              else chunkText += numbers[ones];
            }
          }
        }
        if (chunkText) {
          if (result)
            result = chunkText + " " + units[unitIndex] + " " + result;
          else result = chunkText + " " + units[unitIndex];
        }
      }
      numStr = numStr.slice(0, -3);
      unitIndex++;
    }

    return result.trim() + " đồng";
  };

  // Function to format input field
  const formatInputField = (input) => {
    let value = input.value.replace(/\./g, ""); // Remove existing dots
    if (value && !isNaN(value)) {
      input.value = formatNumber(value);
    }
  };

  // Add member functionality
  addMemberBtn.addEventListener("click", () => {
    memberCount++;
    const memberDiv = document.createElement("div");
    memberDiv.classList.add("mb-3");
    memberDiv.innerHTML = `
            <label for="member-${memberCount}" class="form-label">Tên thành viên #${memberCount}</label>  
            <button type="button" style="margin-bottom: 0.4em" class="btn btn-danger btn-sm mt-2 remove-member-btn">Xóa </button>  
            <label for="member-${memberCount}-is-50-payer" class="form-label">Chọn trả 50%</label>
            <input type="radio" name="is-50-payer" id="member-${memberCount}-is-50-payer" class="form-check-input">
            <input type="text" class="form-control mb-2" id="member-${memberCount}-name" placeholder="Nhập tên">
            <label for="member-${memberCount}-expense" class="form-label">Đã ứng (VND) (ví dụ: 100k = 100000)</label>
            <input type="text" class="form-control mb-2" id="member-${memberCount}-expense" placeholder="Nhập số tiền">
        `;
    membersList.appendChild(memberDiv);

    // Add event listener for formatting input
    const expenseInput = document.getElementById(
      `member-${memberCount}-expense`
    );
    expenseInput.addEventListener("input", () =>
      formatInputField(expenseInput)
    );
    expenseInput.addEventListener("blur", () => formatInputField(expenseInput));

    // Add event listener for removing a member
    memberDiv
      .querySelector(".remove-member-btn")
      .addEventListener("click", () => {
        memberDiv.remove();
        memberCount--;
      });
  });

  // Function to handle calculations
  const calculateExpenses = (isFiftyPercent = false) => {
    const members = [];
    let totalExpenses = 0;
    let fiftyPayer = null;

    for (let i = 1; i <= memberCount; i++) {
      const name = document.getElementById(`member-${i}-name`).value;
      const expenseInput = document.getElementById(`member-${i}-expense`).value;
      const expense = parseFormattedNumber(expenseInput);
      const isFiftyPayer = document.getElementById(
        `member-${i}-is-50-payer`
      ).checked;

      members.push({ name, expense });

      totalExpenses += expense;
      if (isFiftyPayer) {
        fiftyPayer = { name, expense, index: i - 1 };
      }
    }

    if (isFiftyPercent && !fiftyPayer) {
      alert("Vui lòng chọn một người để trả 50% tổng chi phí.");
      return;
    }

    let fiftyPercentTotal = isFiftyPercent ? totalExpenses / 2 : 0;
    let remainingTotal = isFiftyPercent
      ? totalExpenses - fiftyPercentTotal
      : totalExpenses;
    let equalShareForOthers =
      remainingTotal / (isFiftyPercent ? members.length - 1 : members.length);

    const transactions = [];

    members.forEach((member, index) => {
      let balance;
      if (isFiftyPercent && index === fiftyPayer.index) {
        balance = member.expense - fiftyPercentTotal;
      } else {
        balance = member.expense - equalShareForOthers;
      }
      transactions.push({ name: member.name, balance });
    });

    // Display total expenses and average per person with formatted numbers and text
    resultsDiv.innerHTML = `<h4>Tổng chi: ${formatNumber(
      totalExpenses.toFixed(0)
    )} VND (${numberToVietnameseText(Math.round(totalExpenses))})</h4>`;
    if (isFiftyPercent) {
      resultsDiv.innerHTML += `<h4>${
        fiftyPayer.name
      } phải trả 50% tổng chi phí: ${formatNumber(
        fiftyPercentTotal.toFixed(0)
      )} VND (${numberToVietnameseText(Math.round(fiftyPercentTotal))})</h4>`;
      resultsDiv.innerHTML += `<h4>Trung bình mỗi người còn lại phải trả: ${formatNumber(
        equalShareForOthers.toFixed(0)
      )} VND (${numberToVietnameseText(Math.round(equalShareForOthers))})</h4>`;
    } else {
      resultsDiv.innerHTML += `<h4>Trung bình mỗi người phải trả: ${formatNumber(
        equalShareForOthers.toFixed(0)
      )} VND (${numberToVietnameseText(Math.round(equalShareForOthers))})</h4>`;
    }

    // Calculate who owes whom
    let lenders = transactions.filter((t) => t.balance > 0);
    let borrowers = transactions.filter((t) => t.balance < 0);

    resultsDiv.innerHTML += "<h4>Chi tiết thanh toán</h4>";

    while (lenders.length && borrowers.length) {
      lenders.sort((a, b) => b.balance - a.balance);
      borrowers.sort((a, b) => a.balance - b.balance);

      const lender = lenders[0];
      const borrower = borrowers[0];

      const amount = Math.min(lender.balance, Math.abs(borrower.balance));
      resultsDiv.innerHTML += `<p><strong>${
        borrower.name
      }</strong> trả cho <strong>${lender.name}</strong> ${formatNumber(
        amount.toFixed(0)
      )} VND (${numberToVietnameseText(Math.round(amount))})</p>`;

      lender.balance -= amount;
      borrower.balance += amount;

      if (lender.balance < 0.1) lender.balance = 0; // Handle small decimals
      if (borrower.balance > -0.1) borrower.balance = 0; // Handle small decimals

      if (lender.balance === 0) lenders.shift();
      if (borrower.balance === 0) borrowers.shift();
    }

    resultsDiv.innerHTML += `<p style="color: green;">Đã Chia Đồng Đều</p>`;
  };

  // Calculate equally for all members
  calculateBtnFair.addEventListener("click", () => {
    calculateExpenses(false);
  });

  // Calculate with 50% payer
  calculateBtnFifty.addEventListener("click", () => {
    calculateExpenses(true);
  });
});
