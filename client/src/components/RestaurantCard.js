function RestuarantCard(props){
    return(
    <div>
        <div>{props.restaurant.name}</div>
        <div>{props.restaurant.shortDescription}</div>
    </div>
    )
}

export default RestuarantCard;