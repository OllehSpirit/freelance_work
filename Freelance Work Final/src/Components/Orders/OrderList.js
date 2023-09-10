import OrderItem from './OrderItem';
import classes from'./AllOrders.Module.css';

function OrderList(props){
    //  console.log(props.orders);
    return(
            <ul className={classes.AllOrders}>
                {props.orders.map(order => 
                    <OrderItem 
                        key={order.id}
                        id={order.id}
                        title={order.title}
                        address={order.address}
                        description={order.description}

                        countTailor={order.countTailor}
                        countPainter={order.countPainter}
                        countTd={order.countTd}
                        countCarpenter={order.countCarpenter}

                        gov={order.gov}
                    />
            ) }
            </ul>
    );
}
export default OrderList;