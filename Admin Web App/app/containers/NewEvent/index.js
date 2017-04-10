import requestConnector from './requestConnector';
import formConnector from './formConnector';
import reduxConnector from './reduxConnector';
import NewEvent from './NewEvent.jsx';

// Wrap Request > Form > Redux > View
// Therefor Request is most outer and View is most inner
export default requestConnector(formConnector(reduxConnector(NewEvent)));
