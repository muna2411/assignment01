const addExpenseButton = document.getElementById("add-expense-button");

const descriptionInput = document.getElementById("description");
const valueInput = document.getElementById("value");
const selectInput = document.getElementById("type");

const incomeList = document.getElementById("income-list");
const expenseList = document.getElementById("expense-list");
const totalIncome = document.getElementById("total-income");
const totalExpense = document.getElementById("total-expense");
const totalBudget = document.getElementById("total-budget");

function formatMoney(value) {
  return Math.abs(Number(value)).toLocaleString(undefined, {
    minimumFractionDigits: 2,
  });
}

function calculateIncome() {
  let sum = 0;
  for (let item of incomeList.children) {
    const valueString =
      item.children[0].children[1].children[0].innerHTML.replace(/,/g, "");

    console.log(parseFloat(valueString));
    sum += parseFloat(valueString);
  }
  totalIncome.innerHTML = formatMoney(sum);
}
calculateIncome();

/**
 * Task 1: Calculate total expense
 */
function calculateExpense() {
  let sum2 = 0;
  for (let items of expenseList.children) {
    const valueString =
      items.children[0].children[1].children[0].innerHTML.replace(/,/g, "");

    console.log(parseFloat(valueString));
    sum2 += parseFloat(valueString);
  }
  totalExpense.innerHTML = formatMoney(sum2);
}
calculateExpense();

/**
 * Task 2: Calculate the budget
 */

function calculateBudget() {
  const totalIncomeValue = parseFloat(totalIncome.innerHTML.replace(/,/g, ""));
  const totalExpenseValue = parseFloat(totalExpense.innerHTML.replace(/,/g, ""));

  const budget = totalIncomeValue - totalExpenseValue;

  totalBudget.innerHTML = formatMoney(budget);

  if (budget === 0) {
    alert("Your budget amount is 0.");
  }
}
calculateBudget();

/**
 * Task 3: Delete Entry
 */
function deleteEntry(event) {
  const clickedElement = event.target;

 
  if (clickedElement.classList.contains("text-red-500")) {
    const listItem = clickedElement.closest("li");
    const list = listItem.parentElement;
    list.removeChild(listItem);
        
    if (list === incomeList) {
      calculateIncome();
    } else if (list === expenseList) {
      calculateExpense();
    }
    else if (list === expenseList) {
      calculateExpense();
    }
    calculateBudget();
  }
}

document.body.addEventListener("click", deleteEntry);


function addEntry() {
  const type = selectInput.value;
  const description = descriptionInput.value;
  const value = valueInput.value;

  // data validation
  const errors = [];
  if (description.length === 0) {
    errors.push("Please enter the description");
  }
  if (value.length === 0) {
    errors.push("Please enter the value");
  }
  if (errors.length > 0) {
    alert(errors);
    return;
  }



  const currentBudget = parseFloat(totalBudget.innerHTML.replace(/,/g, ""));
  if (currentBudget <= 0) {
    alert("Your budget is currently 0. Cannot add income or expense.");
    return;
  }



  // insert entry
  const list = type === "income" ? incomeList : expenseList;
  const sign = type === "income" ? "+" : "-";
  const colorClass = type === "income" ? "text-green-600" : "text-red-600";

  const newEntryHtml = `
    <li class="py-2.5">
      <div class="group flex justify-between gap-2 text-sm">
        <span>${description}</span>
        <div>
          <span class="${colorClass}">${sign}${formatMoney(value)}</span>
          <span
            class="ml-2 hidden cursor-pointer font-medium text-red-500 group-hover:inline-block"
          >
            Delete
          </span>
        </div>
      </div>
    </li>
    `;

  // Approach 1:
  list.innerHTML += newEntryHtml;


  // update total income value
  calculateIncome();
  calculateExpense();
  calculateBudget();

}

addExpenseButton.addEventListener("click", addEntry);
