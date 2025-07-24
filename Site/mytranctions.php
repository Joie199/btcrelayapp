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
<?php
 
$curl = curl_init();
 
curl_setopt_array($curl, [
CURLOPT_URL => "https://sandboxapi.bitnob.co/api/v1/transactions/?order=ASC&page=1&take=10",
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
$transactions = json_decode($response, true)['data']['transactions'];
?>

<div class="space-y-4">
  <?php foreach ($transactions as $tx): ?>
    <div class="p-4 bg-white rounded-lg shadow border-l-4 border-yellow-500">
      <div class="flex justify-between items-center mb-2">
        <h3 class="text-lg font-semibold">💳 <?php echo $tx['description']; ?> — $<?php echo $tx['amount']; ?></h3>
        <span class="text-sm text-gray-500"><?php echo date("Y-m-d H:i", strtotime($tx['createdAt'])); ?></span>
      </div>

      <p class="text-sm text-gray-600">🧾 Ref: <span class="font-mono"><?php echo $tx['reference']; ?></span></p>
      <p class="text-sm text-gray-600">🔁 BTC: <?php echo $tx['btcAmount']; ?> (<?php echo $tx['satAmount']; ?> sats)</p>
      <p class="text-sm text-gray-600">📦 Wallet: <?php echo $tx['wallet']['name']; ?></p>
      <p class="text-sm text-gray-600">📍 Status: 
        <span class="inline-block px-2 py-0.5 rounded text-xs 
          <?php echo $tx['status'] === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'; ?>">
          <?php echo ucfirst($tx['status']); ?>
        </span>
      </p>
    </div>
  <?php endforeach; ?>
</div>



      </div>
    </div>
    </div>
  </main>
</body>

</html>