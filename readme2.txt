app.put('/your-endpoint', permitIn(['admin', 'user']), (req, res) => {
    const receivedData = req.body;

    // Do something with the data
    console.log('Received data:', receivedData);

    // Respond to the client
    res.json({ message: 'Data received successfully' });
});




# เราจะไม่เชื่อข้อมูลของผู้ใช้ แต่เราจะ verify jwt แล้วดึง status