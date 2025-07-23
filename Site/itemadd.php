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
        <h2 class="text-xl font-semibold mb-4">Vendor Dashboard</h2>
        <form method="POST" action="add_item.php" class="grid gap-4 mb-6">
          <input type="text" name="item_name" placeholder="Item name" class="p-2 border rounded">
          <input type="text" name="price_btc" placeholder="Price in BTC" class="p-2 border rounded">
          <button type="submit" class="bg-green-500 text-white px-4 py-2 rounded">Add Item</button>
        </form>


        </div>
      </div>
    
  </main>
</body>
</html>
