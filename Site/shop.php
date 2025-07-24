<?php 
include 'config.php'; 
?>
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
          $query = "SELECT * FROM `Hackthon-bitnob`.`products` ";

          $result = mysqli_query($link, $query);
          ?>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
            <?php while ($row = mysqli_fetch_assoc($result)) { 
              $partsvender = explode('@', $row['user_namel']);
              $namevender = $partsvender[0];
              ?>
              
              <div class="bg-white border border-gray-200 rounded-xl shadow p-4 flex flex-col items-center justify-center text-center aspect-square">
                <form action = "itemtobesold.php" method = "POST">
                  <input type="hidden" name="pid" value="<?= $row['id'] ?>">
                  <input type="hidden" name="pname" value="<?= $row['pname'] ?>">
                  <input type="hidden" name="price" value="<?= $row['price'] ?>">
                  <input type="hidden" name="user_namel" value="<?= $row['user_namel'] ?>">

                <h2 class="text-lg font-semibold text-gray-800 mb-2"><?= htmlspecialchars($row['pname']) ?></h2>
                <p class="text-green-600 font-bold mb-1">$<?= number_format($row['price'], 2) ?></p>
                <p class="text-sm text-gray-500">By: <?= htmlspecialchars($namevender) ?></p>
                <br>
            <button type="submit" class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md">
  Select
</button>
                </form>
              </div>
            <?php } ?>
          </div> 
        </div>
      </div>
    </div>
  </main>
</body>

</html>