//LISTEN FOR SUBMIT
document.getElementById('loan-form').addEventListener('submit', function(e) {
  //HIDE RESULTS
  document.getElementById('results').style.display = 'none';
  
  //SHOW LOADING
  document.getElementById('loading').style.display = 'block';
  
  setTimeout(calculateResults, 2000);

  e.preventDefault();  
});

//CALCULATE RESULTS
function calculateResults() {
  console.log('Calculating...');
  //UI VARS
  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');

  const principal = parseFloat(amount.value);
  const calculateInterest = parseFloat(interest.value) / 100 / 12;
  const calculatePayment = parseFloat(years.value) * 12;
  
  //COMPUTE MONTHLY PAYMENT
  const x = Math.pow(1 + calculateInterest , calculatePayment);
  const monthly = (principal * x * calculateInterest) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly*calculatePayment).toFixed(2);
    totalInterest.value = ((monthly * calculatePayment) - principal).toFixed(2);
    
    //SHOW RESULTS
    document.getElementById('results').style.display = 'block';

    //HIDE LOADING
  document.getElementById('loading').style.display = 'none';

  } else {
    showError('Please check your numbers');
  }
}

//SHOW ERROR
function showError(error){
   //HIDE RESULTS
   document.getElementById('results').style.display = 'none';

   //HIDE LOADING
 document.getElementById('loading').style.display = 'none';

  //create div
  const errorDiv = document.createElement('div');

  //GET ELEMENTS
  const card = document.querySelector('.card');
  const heaading = document.querySelector('.heading');

  //ADD CLASS
  errorDiv.className = 'alert alert-danger';

  //CREATE TEXT NODE AND APPEND TO DIV
  errorDiv.appendChild(document.createTextNode(error));

  //INSERT ERROR ABOVE HEADING
  card.insertBefore(errorDiv , heaading);

  //CLEAR ERROR AFTER 3 SEC
  setTimeout(clearError, 3000);

}

//CLEAR ERROR
function clearError(){
  document.querySelector('.alert').remove();
}