function ReservationForm(){
    return(
    <form>
        <div>
            <div>Reservation</div>
            <input placeholder="Number of people"/>
            <input placeholder="Date"/>
            <input placeholder="Time"/>
        </div>
        <div>
            <textarea placeholder="Message for the restaurant"/>
            <div>
            <input type="submit" value="Make reservation"/>
            </div>
        </div>
        
        
    </form>
    )
}
export default ReservationForm;