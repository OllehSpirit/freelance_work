import WorkItem from './WorkItem';
import classes from'./Work.Module.css';

function WorkList(props){
    return(
            <ul className={classes.AllWorks}>
                {props.works.map(work => 
                    <WorkItem 
                        key={work.id}
                        id={work.id}
                        image={work.image}
                        title={work.title}
                        govChecked={work.govChecked}
                        address={work.address}
                        description={work.description}
                        job={work.job}
                        other={work.other}
                    />
            ) }
            </ul>
    );
}
export default WorkList;