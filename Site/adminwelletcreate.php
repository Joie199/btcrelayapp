<?php include 'config.php'; ?>

<?php 

$curl = curl_init();
 
curl_setopt_array($curl, [
CURLOPT_URL => "https://sandboxapi.bitnob.co/api/v1/wallets/create-new-crypto-wallet",
CURLOPT_RETURNTRANSFER => true,
CURLOPT_ENCODING => "",
CURLOPT_MAXREDIRS => 10,
CURLOPT_TIMEOUT => 30,
CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
CURLOPT_CUSTOMREQUEST => "POST",
CURLOPT_POSTFIELDS => json_encode(['coin' => 'bnb' ]),
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
echo $response;
}

?>