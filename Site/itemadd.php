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
  <!-- Sidebar Menu -->
  <?php include 'sidebar.php'; ?>

  <!-- Main Content -->
  <main class="flex-1 p-6">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold text-center mb-8">Multi-Vendor Bitcoin E-commerce</h1>

      <!-- Vendor Dashboard -->
      <div id="dashboard" class="bg-white p-6 rounded shadow">
        <h2 class="text-xl font-semibold mb-4">Vendor Dashboard</h2>
        <?php

        if (isset($_POST['add'])) {


         // print_r($_POST);

          $productname = $_POST['productname'];
          $price = $_POST['price'];
          $querymember = "INSERT INTO `Hackthon-bitnob`.`products` ( `pname`, `price`, `user_namel`) VALUES ('$productname', '$price', '$suser_name');
";

          mysqli_query($link, $querymember);

        ?>
          <div class="flex items-center justify-between p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg shadow" role="alert" id="user-created-alert">
            <div class="flex items-center space-x-2">
              <svg class="w-5 h-5 text-green-700" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span>User has been successfully created.</span>
            </div>
            <button type="button" class="text-green-700 hover:text-green-900 focus:outline-none" onclick="document.getElementById('user-created-alert').remove();">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

        <?php
        }

        ?>
        <form method="POST" action="itemadd.php" class="grid gap-4 mb-6">
          <input name="productname" type="text" name="item_name" placeholder="Item name" class="p-2 border rounded">
          <input name="price" type="text" name="price_btc" placeholder="Price in Local" class="p-2 border rounded">
          <button name="add" type="submit" class="bg-green-500 text-white px-4 py-2 rounded">Add Item</button>
        </form>


      </div>
    </div>

  </main>
</body>

</html>