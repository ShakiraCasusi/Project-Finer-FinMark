document.addEventListener('DOMContentLoaded', () => {
    // Set the initial page to overview
    const content = document.querySelector('.content');
    content.innerHTML = `<h1>Dashboard Overview</h1><div class="page-content widgets"></div>`;
    loadOverviewData();

    // Add event listeners to navigation links
    const navLinks = document.querySelectorAll('.sidebar-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            const page = link.textContent.toLowerCase();
            loadPage(page);
        });
    });
});

async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Could not fetch data from ${url}:`, error);
    }
}

async function loadPage(page) {
    const content = document.querySelector('.content');
    const pageTitle = page.charAt(0).toUpperCase() + page.slice(1);
    content.innerHTML = `<h1>${pageTitle}</h1><div class="page-content"></div>`;
    const pageContent = document.querySelector('.page-content');

    switch (page) {
        case 'overview':
            pageContent.classList.add('widgets');
            await loadOverviewData();
            break;
        case 'loans':
            await loadLoansPage();
            break;
        case 'investments':
            await loadInvestmentsPage();
            break;
        default:
            pageContent.innerHTML = '<p>This page is under construction.</p>';
    }
}

async function loadOverviewData() {
    const loans = await fetchData('data/loans.json');
    const investments = await fetchData('data/investments.json');

    if (loans && investments) {
        displaySummaryWidgets(loans, investments);
    }
}

function displaySummaryWidgets(loans, investments) {
    const widgetsContainer = document.querySelector('.widgets');
    if (!widgetsContainer) return;
    widgetsContainer.innerHTML = ''; // Clear existing widgets

    const totalLoanAmount = loans.reduce((sum, loan) => sum + loan.amount, 0);
    const totalInvestmentValue = investments.reduce((sum, investment) => sum + investment.currentValue, 0);
    const activeLoansCount = loans.filter(loan => loan.status === 'Active').length;
    const totalInvestmentAmount = investments.reduce((sum, investment) => sum + investment.amount, 0);
    const totalReturn = totalInvestmentValue - totalInvestmentAmount;

    const widgets = [
        { title: 'Total Loan Amount', value: `$${totalLoanAmount.toLocaleString()}` },
        { title: 'Total Investment Value', value: `$${totalInvestmentValue.toLocaleString()}` },
        { title: 'Active Loans', value: activeLoansCount },
        { title: 'Total Investment Return', value: `$${totalReturn.toLocaleString()}` }
    ];

    widgets.forEach(widget => {
        const widgetElement = document.createElement('div');
        widgetElement.classList.add('widget');
        widgetElement.innerHTML = `
            <h3>${widget.title}</h3>
            <p>${widget.value}</p>
        `;
        widgetsContainer.appendChild(widgetElement);
    });
}

async function loadLoansPage() {
    const loans = await fetchData('data/loans.json');
    if (loans) {
        displayLoansTable(loans);
    }
}

function displayLoansTable(loans) {
    const pageContent = document.querySelector('.page-content');
    if (!pageContent) return;
    pageContent.innerHTML = '';
    const table = document.createElement('table');
    table.classList.add('data-table');
    table.innerHTML = `
        <thead>
            <tr>
                <th>ID</th>
                <th>Client Name</th>
                <th>Amount</th>
                <th>Interest Rate</th>
                <th>Status</th>
            </tr>
        </thead>
        <tbody>
            ${loans.map(loan => `
                <tr>
                    <td>${loan.id}</td>
                    <td>${loan.clientName}</td>
                    <td>$${loan.amount.toLocaleString()}</td>
                    <td>${loan.interestRate}%</td>
                    <td><span class="status status-${loan.status.toLowerCase().replace(' ', '_')}">${loan.status}</span></td>
                </tr>
            `).join('')}
        </tbody>
    `;
    pageContent.appendChild(table);
}

async function loadInvestmentsPage() {
    const investments = await fetchData('data/investments.json');
    if (investments) {
        displayInvestmentsTable(investments);
    }
}

function displayInvestmentsTable(investments) {
    const pageContent = document.querySelector('.page-content');
    if (!pageContent) return;
    pageContent.innerHTML = '';
    const table = document.createElement('table');
    table.classList.add('data-table');
    table.innerHTML = `
        <thead>
            <tr>
                <th>ID</th>
                <th>Investment Name</th>
                <th>Amount</th>
                <th>Current Value</th>
                <th>Return</th>
            </tr>
        </thead>
        <tbody>
            ${investments.map(investment => `
                <tr>
                    <td>${investment.id}</td>
                    <td>${investment.investmentName}</td>
                    <td>$${investment.amount.toLocaleString()}</td>
                    <td>$${investment.currentValue.toLocaleString()}</td>
                    <td>${investment.returnPercentage}%</td>
                </tr>
            `).join('')}
        </tbody>
    `;
    pageContent.appendChild(table);
}
