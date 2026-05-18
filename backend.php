<?php
// =============================================
// PAWSPALS - BACKEND PHP
// =============================================

header('Content-Type: application/json');

// Database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "pawspals";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(['success' => false, 'message' => 'Database connection failed']));
}

// Get action from request
$action = $_POST['action'] ?? '';

// =============================================
// REGISTRATION
// =============================================
if ($action === 'register') {
    $name = $conn->real_escape_string($_POST['name'] ?? '');
    $email = $conn->real_escape_string($_POST['email'] ?? '');
    $gender = $conn->real_escape_string($_POST['gender'] ?? '');
    $dob = $conn->real_escape_string($_POST['dob'] ?? '');
    $store = $conn->real_escape_string($_POST['store'] ?? '');
    $pet_preference = $conn->real_escape_string($_POST['pet_preference'] ?? '');
    $feedback = $conn->real_escape_string($_POST['feedback'] ?? '');
    $password = password_hash($_POST['dob'], PASSWORD_DEFAULT); // Using DOB as initial password

    // Check if email exists
    $checkEmail = $conn->query("SELECT id FROM customers WHERE email = '$email'");
    if ($checkEmail->num_rows > 0) {
        echo json_encode(['success' => false, 'message' => 'Email already registered']);
        exit;
    }

    $sql = "INSERT INTO customers (name, email, password, gender, dob, preferred_store, pet_preference, feedback, created_at) 
            VALUES ('$name', '$email', '$password', '$gender', '$dob', '$store', '$pet_preference', '$feedback', NOW())";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(['success' => true, 'message' => 'Registration successful']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Registration failed: ' . $conn->error]);
    }
}

// =============================================
// LOGIN
// =============================================
else if ($action === 'login') {
    $email = $conn->real_escape_string($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';

    $sql = "SELECT id, name, email FROM customers WHERE email = '$email' LIMIT 1";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        // In production, use proper password verification
        echo json_encode([
            'success' => true,
            'message' => 'Login successful',
            'user' => [
                'id' => $row['id'],
                'name' => $row['name'],
                'email' => $row['email']
            ]
        ]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid email or password']);
    }
}

// =============================================
// CHECKOUT & ORDER
// =============================================
else if ($action === 'checkout') {
    $cart = json_decode($_POST['cart'] ?? '[]', true);
    $total = floatval($_POST['total'] ?? 0);
    
    // In production, get user ID from session
    $user_id = 1; // Placeholder

    $sql = "INSERT INTO orders (customer_id, total_amount, status, created_at) 
            VALUES ($user_id, $total, 'pending', NOW())";

    if ($conn->query($sql) === TRUE) {
        $order_id = $conn->insert_id;

        foreach ($cart as $item) {
            $product_name = $conn->real_escape_string($item['name'] ?? '');
            $price = floatval(str_replace(['₹', ','], '', $item['price'] ?? 0));
            $quantity = intval($item['quantity'] ?? 1);

            $sql_item = "INSERT INTO order_items (order_id, product_name, price, quantity) 
                        VALUES ($order_id, '$product_name', $price, $quantity)";
            $conn->query($sql_item);
        }

        echo json_encode(['success' => true, 'message' => 'Order placed successfully', 'order_id' => $order_id]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Checkout failed']);
    }
}

// =============================================
// DEFAULT RESPONSE
// =============================================
else {
    echo json_encode(['success' => false, 'message' => 'Invalid action']);
}

$conn->close();
?>
