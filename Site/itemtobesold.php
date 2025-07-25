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
        //print_r($_POST);
        $uname = $_POST['user_namel'];  
        $price = $_POST['price'];  
        $pname = $_POST['pname'];  
        


        $query = "SELECT * FROM `Hackthon-bitnob`.`members` where `M_name` = '$uname' ";
        $result = mysqli_query($link, $query);

        while ($row = mysqli_fetch_assoc($result)) {
            $lightingaddress = $row['lightingaddress'];
            $btcaddress = $row['btcaddress'];
        }
          ?>

         <?php

function ugxToSats($ugxAmount) {
    // Use Coinbase to get BTC to UGX exchange rate
    $response = file_get_contents("https://api.coinbase.com/v2/exchange-rates?currency=BTC");

    if (!$response) {
        return "Failed to connect to Coinbase API.";
    }

    $data = json_decode($response, true);
    $rateUGX = $data['data']['rates']['UGX'];

    if (!$rateUGX || $rateUGX == 0) {
        return "Invalid price data.";
    }

    // 1 BTC = 100,000,000 sats
    $sats = ($ugxAmount / $rateUGX) * 100000000;

    return floor($sats); // return integer sats
}

// Example usage
$ugx = $price;
$satoshis = ugxToSats($ugx);
echo "UGX $ugx = $satoshis sats";
?>

<?php
 
$curl = curl_init();
 
curl_setopt_array($curl, [
CURLOPT_URL => "https://sandboxapi.bitnob.co/api/v1/wallets/ln/createinvoice",
CURLOPT_RETURNTRANSFER => true,
CURLOPT_ENCODING => "",
CURLOPT_MAXREDIRS => 10,
CURLOPT_TIMEOUT => 30,
CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
CURLOPT_CUSTOMREQUEST => "POST",
CURLOPT_POSTFIELDS => json_encode([
  'satoshis' => $satoshis,
  'customerEmail' => $uname,
  'description' => $lightingaddress,
]),
CURLOPT_HTTPHEADER => [
  "Authorization: Bearer $key",
  "accept: application/json",
  "content-type: application/json"
],
]);
 
$response = curl_exec($curl);
$err = curl_error($curl);
 
curl_close($curl);
 
if ($err) {
echo "cURL Error #:" . $err;
} else {

$response=json_decode($response);
//echo $response;
//print_r($response->{'data'}->{'bip21'});
echo "<br>";
$url = $response->{'data'}->{'request'};
?>
<div class="p-6 bg-white rounded-lg shadow border-l-4 border-red-500 w-full">
  <h3 class="text-xl font-semibold mb-2">🚧 Lightning Invoice</h3>
  <p class="text-gray-700 break-all text-sm leading-relaxed overflow-hidden">
    <?php echo htmlspecialchars($url); ?>
  </p>
</div>
<?php
            // Example PHP to display items (replace with real DB logic)
            $items = [
              ["name" => $pname, "price" => $price],
            ];
            foreach ($items as $item):
              $qr = urlencode($url);
          ?>
          <div class="p-4 border rounded shadow">
            <p class="font-semibold text-lg"><?= htmlspecialchars($item['name']) ?></p>
            <p class="mb-2">Price: <?= htmlspecialchars($item['price']) ?> BTC</p>
            <img src="https://api.qrserver.com/v1/create-qr-code/?data=<?= $qr ?>&amp;size=150x150" alt="QR Code">
          </div>
          <?php endforeach; ?>
        </div>
<?php
      }

 ?>

          
        </div>
      </div>
    </div>
  </main>
</body>

</html>