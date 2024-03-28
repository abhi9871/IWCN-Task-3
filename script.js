const PostData = () => {
    const [phoneNumber, setPhoneNumber] = React.useState('');
    const [responseHeader, setResponseHeader] = React.useState(null);

    const phoneNumberHandler = (e) => {
        setPhoneNumber(e.target.value);
    }

    const submitHandler = async(e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://chimpu.xyz/api/post.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({phonenumber: phoneNumber})
            });
            
            if(!response.ok){
                throw new Error("Something went wrong");
            }
            const headersArray = [];
            const responseHeaders =  response.headers;
            for(const item of responseHeaders.entries()) {
                headersArray.push(`${item[0]}: ${item[1]}`);
            }
            console.log(headersArray);
            setResponseHeader(headersArray);
            setPhoneNumber('');

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <form onSubmit={submitHandler}>
                <label>Phone Number:</label>
                <input type='number' value={phoneNumber} onChange={phoneNumberHandler}></input>
                <button type='submit'>Post Data</button>
            </form>
            <ul>
                {
                    responseHeader && responseHeader.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))
                }
            </ul>
        </div>
    )
}

ReactDOM.render(
    <PostData />,
  document.getElementById('root')
);