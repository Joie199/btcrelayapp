<?php include 'config.php'; ?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Multi-Vendor Bitcoin E-commerce</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>

<body class="bg-gray-100 min-h-screen flex">
  <?php include 'sidebar.php'; ?>

  <!-- Main Content -->
  <main class="flex-1 p-6">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold text-center mb-8">Multi-Vendor Bitcoin E-commerce</h1>


      <!-- Vendor Dashboard -->
      <div id="dashboard" class="bg-white p-6 rounded shadow">

        <!-- Items List -->
        <h2 class="text-2xl font-bold mb-4 text-center">🚀 Pitch Summary</h2>
        <div class="grid gap-6">
          <div class="p-6 bg-white rounded-lg shadow border-l-4 border-blue-500">
            <h3 class="text-2xl font-bold mb-2">📌 Project Name: Multi-Vendor Bitcoin E-commerce</h3>
            <p class="text-gray-700">BitMarket is a decentralized e-commerce platform enabling vendors to sell products directly for Bitcoin using QR code payment and enable venders to withdraw their earnings in local currencies.</p>
          </div>
          <div class="p-6 bg-white rounded-lg shadow border-l-4 border-red-500">
            <h3 class="text-xl font-semibold mb-2">🚧 Problem to Solve</h3>
            <p class="text-gray-700">Many sellers in emerging markets lack access to global payment systems. BitMarket bridges that gap using borderless Bitcoin payments with no intermediaries.</p>
          </div>
          <div class="p-6 bg-white rounded-lg shadow border-l-4 border-green-500">
            <h3 class="text-xl font-semibold mb-2">🎯 Target Market</h3>
            <p class="text-gray-700">Freelancers, small businesses, and independent sellers in Africa and developing regions who want to accept crypto payments.</p>
          </div>
          <div class="p-6 bg-white rounded-lg shadow border-l-4 border-yellow-500">
            <h3 class="text-xl font-semibold mb-2">💸 Revenue Model</h3>
            <p class="text-gray-700">BitMarket will earn via small service fees per transaction, premium listing features for vendors, and optional wallet integrations.</p>
          </div>
          <div class="p-6 bg-white rounded-lg shadow border-l-4 border-purple-500">
            <h3 class="text-xl font-semibold mb-2">⏳ Time Estimate</h3>
            <p class="text-gray-700">Prototype in 48 hours for hackathon. MVP within 3-4 weeks. Production-ready in 2-3 months with community feedback.</p>
          </div>
          <a href="doc/Multi%20vender%20Bitcoin%20introduction.docx" target="_blank" class="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
  📄 Read Full Document
</a>

        </div>

      </div>
    </div>
    </div>
  </main>
</body>

</html>