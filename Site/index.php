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
  <aside class="w-64 bg-white shadow-lg min-h-screen p-6 space-y-6">
    <h2 class="text-2xl font-bold text-blue-600">Dashboard</h2>
    <nav class="flex flex-col space-y-4">
      <a href="#" class="text-gray-700 hover:text-blue-500 font-medium">🏠 Home</a>
      <a href="#register" class="text-gray-700 hover:text-blue-500 font-medium">📝 Register</a>
      <a href="#dashboard" class="text-gray-700 hover:text-blue-500 font-medium">🛒 Vendor Dashboard</a>
      <a href="#" class="text-gray-700 hover:text-blue-500 font-medium">📦 My Items</a>
      <a href="#" class="text-gray-700 hover:text-blue-500 font-medium">⚙️ Settings</a>
    </nav>
  </aside>

  <!-- Main Content -->
  <main class="flex-1 p-6">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold text-center mb-8">Multi-Vendor Bitcoin E-commerce</h1>

      <!-- Register Section -->
      <div id="register" class="bg-white p-6 rounded shadow mb-8">
        <h2 class="text-xl font-semibold mb-4">Register</h2>
        <form method="POST" action="register.php" class="grid gap-4">
          <select name="role" class="p-2 border rounded">
            <option value="user">User</option>
            <option value="vendor">Vendor</option>
          </select>
          <input type="email" name="email" placeholder="Email" class="p-2 border rounded">
          <input type="password" name="password" placeholder="Password" class="p-2 border rounded">
          <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Register</button>
        </form>
      </div>

      <!-- Vendor Dashboard -->
      <div id="dashboard" class="bg-white p-6 rounded shadow">
        <h2 class="text-xl font-semibold mb-4">Vendor Dashboard</h2>
        <form method="POST" action="add_item.php" class="grid gap-4 mb-6">
          <input type="text" name="item_name" placeholder="Item name" class="p-2 border rounded">
          <input type="text" name="price_btc" placeholder="Price in BTC" class="p-2 border rounded">
          <button type="submit" class="bg-green-500 text-white px-4 py-2 rounded">Add Item</button>
        </form>

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
