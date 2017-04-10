import requestConnector from './requestConnector';
import reduxConnector from './reduxConnector';
import CategoryList from './CategoryList.jsx';

// Wrap Request > Redux > View
// Therefor Request is most outer and View is most inner
export default requestConnector(reduxConnector(CategoryList));
