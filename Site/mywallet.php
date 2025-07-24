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

<?php
 
$curl = curl_init();
 
curl_setopt_array($curl, [
CURLOPT_URL => "https://sandboxapi.bitnob.co/api/v1/wallets",
CURLOPT_RETURNTRANSFER => true,
CURLOPT_ENCODING => "",
CURLOPT_MAXREDIRS => 10,
CURLOPT_TIMEOUT => 30,
CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
CURLOPT_CUSTOMREQUEST => "GET",
CURLOPT_HTTPHEADER => [
  "Authorization: Bearer $key",
  "accept: application/json"
],
]);
 
$response = curl_exec($curl);
$err = curl_error($curl);
 
curl_close($curl);
 
if ($err) {
echo "cURL Error #:" . $err;
} else {
 $response;

}
 ?>
 <?php
$wallets = json_decode($response, true)['data'];
?>

<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
  <?php foreach ($wallets as $wallet): ?>
    <div class="p-6 bg-white rounded-lg shadow border-l-4 border-blue-500">
      <h3 class="text-xl font-semibold mb-2"><?php echo $wallet['name']; ?></h3>
      <p class="text-gray-700 mb-1">💬 <?php echo $wallet['description']; ?></p>
      <p class="text-gray-800 mb-1">💰 Currency: <strong><?php echo strtoupper($wallet['currency']); ?></strong></p>
      <?php if ($wallet['currency'] === 'btc'): ?>
        <p>🟠 Balance: <strong><?php echo number_format($wallet['balance']['btc'], 8); ?> BTC</strong> (<?php echo number_format($wallet['balance']['sat']); ?> sats)</p>
        <p>💵 USD Estimate: $<?php echo number_format($wallet['balance']['usd'], 2); ?></p>
      <?php else: ?>
        <p>💵 Balance: <strong>$<?php echo number_format($wallet['balance']['usd'], 2); ?></strong></p>
      <?php endif; ?>
    </div>
  <?php endforeach; ?>
</div>


    </div>
    </div>
  </main>
</body>

</html>