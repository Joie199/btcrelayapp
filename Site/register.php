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

      <!-- Register Section -->
      <div id="register" class="bg-white p-6 rounded shadow mb-8">
        <h2 class="text-xl font-semibold mb-4">Register</h2>
        <?php 
        if (isset($_POST['register'])) {
            
        
//print_r($_POST);

$emailserver = $_POST['emailform'];
$passserver = $_POST['passform'];
$role = $_POST['role'];


 
$curl = curl_init();
 
curl_setopt_array($curl, [
CURLOPT_URL => "https://sandboxapi.bitnob.co/api/v1/addresses/generate",
CURLOPT_RETURNTRANSFER => true,
CURLOPT_ENCODING => "",
CURLOPT_MAXREDIRS => 10,
CURLOPT_TIMEOUT => 30,
CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
CURLOPT_CUSTOMREQUEST => "POST",
CURLOPT_POSTFIELDS => json_encode([
  'label' => 'purchase xbox',
  'customerEmail' => $emailserver,
  'formatType' => 'bip21',
  'amount' => 'string'
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
$url = $response->{'data'}->{'bip21'};

// Parse the scheme and address (e.g., tb1qq...).
$parts = parse_url($url);
$bitcoin = $parts['path']; // This gets the Bitcoin address

// Parse the query string into variables
parse_str($parts['query'], $query);

$lightning = $query['lightning'] ?? null;

// Now you have:
echo "\n";
echo "Bitcoin: $bitcoin\n";
echo "Lightning: $lightning\n";
$querymember = "INSERT INTO `Hackthon-bitnob`.`members` ( `M_name`, `M_password`, `M_type`,`lightingaddress`,`btcaddress`) VALUES ('$emailserver', '$passserver', '$role','$lightning','$bitcoin');
";



mysqli_query($link, $querymember);


}
 
 
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
        <form method="POST" action="register.php" class="grid gap-4">
          <select name="role" class="p-2 border rounded">
            <option value="user">User</option>
            <option value="vendor">Vendor</option>
          </select>
          <input name = "emailform" type="email" name="email" placeholder="Email" class="p-2 border rounded">
          <input name = "passform" type="password" name="password" placeholder="Password" class="p-2 border rounded">
          <button name = "register" type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Register</button>
        </form>
      </div>

      <!-- Vendor Dashboard -->

    </div>
  </main>
</body>
</html>
