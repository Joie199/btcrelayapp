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
<?php 
 $query = "SELECT * FROM `Hackthon-bitnob`.`members` ";
 $result = mysqli_query($link, $query);

 while ($row = mysqli_fetch_assoc($result)) { 
              $lightingaddress = $row['lightingaddress'];
              $btcaddress = $row['btcaddress'];
 }
?>
  <!-- Main Content -->
  <main class="flex-1 p-6">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold text-center mb-8">Multi-Vendor Bitcoin E-commerce</h1>


      <!-- Vendor Dashboard -->
      <div id="dashboard" class="bg-white p-6 rounded shadow">

        <!-- Items List -->
        <h2 class="text-2xl font-bold mb-4 text-center">🚀 Addresses</h2>
        <div class="grid gap-6">
          <div class="p-6 bg-white rounded-lg shadow border-l-4 border-blue-500">
            <h3 class="text-2xl font-bold mb-2">📌 Bitcoin Address</h3>
            <p class="text-gray-700"><?php echo $btcaddress;?></p>

          </div>
<div class="p-6 bg-white rounded-lg shadow border-l-4 border-red-500 w-full">
  <h3 class="text-xl font-semibold mb-2">🚧 Lightning Address</h3>
  <p class="text-gray-700 break-all text-sm leading-relaxed overflow-hidden">
    <?php echo htmlspecialchars($lightingaddress); ?>
  </p>
</div>

        </div>

      </div>
    </div>
    </div>
  </main>
</body>

</html>