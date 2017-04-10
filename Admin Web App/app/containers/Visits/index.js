import requestConnector from './requestConnector';
import reduxConnector from './reduxConnector';
import Visits from './Visits.jsx';

// Wrap Request > Redux > View
// Therefor Request is most outer and View is most inner
export default requestConnector(reduxConnector(Visits));
