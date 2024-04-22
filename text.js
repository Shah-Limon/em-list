const [adminUsers, setAdminUsers] = useState({});
useEffect(() => {
    fetch('https://raw.githubusercontent.com/Shah-Limon/em-list/master/admin.json')
        .then((res) => res.json())
        .then((info) => {
            setAdminUsers(info);
        });
}, []);
const calculateRemainingDays = () => {
    const { serviceEnd } = adminUsers;
    if (!serviceEnd) return null;
    const endDate = new Date(serviceEnd.split('/').reverse().join('/'));
    const currentDate = new Date();
    const timeDifference = endDate.getTime() - currentDate.getTime();
    const remainingDays = Math.ceil(timeDifference / (1000 * 3600 * 24));
    return remainingDays;
};





<div class="col-12">
    <div className="alert alert-primary" role="alert">
        <h5 className="text-center">
            {
                calculateRemainingDays() >= 0 ? (
                    <>
                        {calculateRemainingDays()} Days Left
                    </>
                ) :
                    (<>
                        Membership has expired
                    </>)
            }
        </h5>
    </div>
    {calculateRemainingDays() <= 0 ? (
        <>
            <div className="hero-image">
                <div className="container text-center">
                    <h1>This is your catchy headline</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    <button type="button" className="btn btn-primary">Buy Now</button>
                </div>
            </div>
        </>
    ) : (
        <>

        </>
    )}


</div>