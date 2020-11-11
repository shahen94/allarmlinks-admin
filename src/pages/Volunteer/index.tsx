import React,{useEffect,useState} from 'react'
import { List, ListItem } from '@material-ui/core/';
import { useSelector,useDispatch} from 'react-redux';
import { RootState } from '../../store';
import { useParams } from 'react-router-dom';
import { fetchById } from '../../store/features/singleVolunteerSlice';
import IVolunteerRecord from '../../types/volunteers/IVolunteer';
interface IParams {
    id: string
}
const Volunteer = () => {
    const dispatch = useDispatch()
    const id: string = useParams<IParams>().id
    
    useEffect(()=>{
        dispatch(fetchById(id))
    },[])
    const volunteer:IVolunteerRecord = useSelector((state:RootState)=>state.singleVolunteer.data)
    console.log(volunteer)
    return (
        <div className="Volunteer">
            <div className="volunteer-container">
                <List component="div" aria-label="mailbox folders">
                    <ListItem divider>
                        <p>
                            <span>Name:</span>
                            <span>{volunteer.name}</span>
                        </p>
                    </ListItem>
                    <ListItem divider>
                        <p>
                            <span>Surname:</span>
                            <span>{volunteer.surname}</span>
                        </p>
                    </ListItem>
                    <ListItem divider>
                        <p>
                            <span>Email address:</span>
                            <span>{volunteer.email}</span>
                        </p>
                    </ListItem>
                    <ListItem divider>
                        <p>
                            <span>Phone number:</span>
                            <span>{volunteer.phoneNumber}</span>
                        </p>
                    </ListItem>
                    <ListItem divider>
                        <p>
                            <span>Birth date:</span>
                            <span>{volunteer.birthDate}</span>
                        </p>
                    </ListItem>
                    <ListItem divider>
                        <p>
                            <span>Country:</span>
                            <span>{volunteer.country}</span>
                        </p>
                    </ListItem>
                    <ListItem divider>
                        <p>
                            <span>City:</span>
                            <span>{volunteer.city}</span>
                        </p>
                    </ListItem>
                    <ListItem divider>
                        <p>
                            <span>Address:</span>
                            <span>{volunteer.address}</span>
                        </p>
                    </ListItem>
                    <ListItem divider>
                        <p>
                            <span>Industry of specialization:</span>
                            <span>{volunteer.specialization}</span>
                        </p>
                    </ListItem>
                    <ListItem divider>
                        <p>
                            <span>Current employer name:</span>
                            <span>{volunteer.currentEmployerName}</span>
                        </p>
                    </ListItem>
                    <ListItem divider>
                        <p>
                            <span>Occupation:</span>
                            <span>{volunteer.occupation}</span>
                        </p>
                    </ListItem>
                    <ListItem divider>
                        <p>
                            <span>Skills:</span>
                            <span>{volunteer.skills?.join(', ')}</span>
                        </p>
                    </ListItem>
                    <ListItem divider>
                        <p>
                            <span>Languages:</span>
                            <span>{volunteer.languages?.join(', ')}</span>
                        </p>
                    </ListItem>
                    <ListItem divider>
                        <p>
                            <span>Availability hours per week:</span>
                            <span>{volunteer.hoursPerWeek?.from} - {volunteer.hoursPerWeek?.to}</span>
                        </p>
                    </ListItem>
                    <ListItem divider>
                        <p>
                            <span>Facebook profile:</span>
                            <span><a href={volunteer.facebookProfile} target="_blank" rel="noopener noreferrer">Facebook</a></span>
                        </p>
                    </ListItem>
                    <ListItem divider>
                        <p>
                            <span>Linkedin profile:</span>
                            <span><a href={volunteer.linkedinProfile} target="_blank" rel="noopener noreferrer">Linkedin</a></span>
                        </p>
                    </ListItem>
                    <ListItem divider>
                        <p>
                            <span>Twitter profile:</span>
                            <span><a href={volunteer.twitterProfile} target="_blank" rel="noopener noreferrer">Twitter</a></span>
                        </p>
                    </ListItem>
                    <ListItem divider>
                        <p>
                            <span>Where do you prefer to volunteer:</span>
                            <span>{volunteer.whereToVolunteer}</span>
                        </p>
                    </ListItem>
                    <ListItem divider>
                        <p>
                            <span>Other info which you would like to to share:</span>
                            <span>{volunteer.other}</span>
                        </p>
                    </ListItem>

                </List>
            </div>
        </div>
    )
}
export default Volunteer

 // let from_store:IVolunteerRecord | {} = useSelector((state: RootState) => {
    //     const from_state = state.volunteers.volunteers.filter((elm: IVolunteerRecord) => elm._id === id)
    //     if(from_state.length){
    //         return from_state[0]
    //     }
    //     else if(state.singleVolunteer._id === id){
    //         return state.singleVolunteer
    //     }
    //     else
    //         return {}
    // })
    // if(!Object.keys(from_store).length){
    //     dispatch(fetchById(id))
    // }