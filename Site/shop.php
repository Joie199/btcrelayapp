<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Multi-Vendor Bitcoin E-commerce</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 min-h-screen flex">
  <!-- Sidebar Menu -->
<?php include 'sidebar.php'; ?>

  <!-- Main Content -->
  <main class="flex-1 p-6">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold text-center mb-8">Multi-Vendor Bitcoin E-commerce</h1>

      
      <!-- Vendor Dashboard -->
      <div id="dashboard" class="bg-white p-6 rounded shadow">


        <!-- Items List -->
        <div class="grid gap-6">
          <?php
            // Example PHP to display items (replace with real DB logic)
            $items = [
              ["name" => "T-Shirt", "price" => "0.001"],
              ["name" => "Ebook", "price" => "0.0005"]
            ];
            foreach ($items as $item):
              $qr = urlencode("bitcoin:your-bitcoin-address?amount=" . $item['price']);
          ?>
          <div class="p-4 border rounded shadow">
            <p class="font-semibold text-lg"><?= htmlspecialchars($item['name']) ?></p>
            <p class="mb-2">Price: <?= htmlspecialchars($item['price']) ?> BTC</p>
            <img src="https://api.qrserver.com/v1/create-qr-code/?data=<?= $qr ?>&amp;size=150x150" alt="QR Code">
          </div>
          <?php endforeach; ?>
        </div>
      </div>
    </div>
  </main>
</body>
</html>
