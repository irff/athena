/*
 *
 * CariInternship reducer
 *
 */

import { fromJS } from 'immutable';
import { combineReducers } from 'redux';
import {
  DEFAULT_ACTION,
  LOAD_DATA_SUCCESS,
} from './constants';
import applyInternshipReducer from 'containers/ApplyInternship/reducer';

const initialState = fromJS({
	posts: [
		{
			job_id: 'idjobswooo',
			role: 'Software pleb intern',
			company: {
				name: 'BukaBukaan',
				logo_url: 'http://i62.tinypic.com/2vhuazt.jpg',
				background_img_url: 'http://dubaiholding.com/wp-content/uploads/2016/04/dubai-group.jpg',
				company_address: 'Jalan Gang anon',
				website: 'www.bukalapak.com',
				category: 'E Commerce'
			},
			why_us: 'kita adalah kompeni ter keren sedunia wao wao wao',
			salary: {
				fee: {
					minimal: 4000000,
					maximal: 8000000
				},
				currency: 'IDR',
				term: 'Bln'
			},
			technical_requirements: ['kita butuh orang jago', 'kita butuh orang keren', 'kita butuh orang wooooo', 'mantab anjeng'],
			job_schedule: {
				start_at: '2016-11-03T06:46:45.562Z',
				end_at: '2017-01-03T06:46:45.562Z'
			},
			tasks: ['ngerjain web', 'ngerjain apps', 'ngerjain si bos'],
			skills_gained: ['ga ada', 'iya ga ada', 'wasting time'],
			experiences_gained: ['skill aja ga ada', 'apalagi ini', 'hoams'],
			contact_person: {
				name: 'Gentor Waskata Triwinosis',
				role: 'Chief Tingtong Officer',
				phone: '+62 857 2834 4446',
				email: 'triwinosis@bl.com'
			},
			job_type: 'internship',
			created_at: '2016-11-03T06:46:45.562Z'
		},
		{
			job_id: 'idjobswooo',
			role: 'Design pleb intern',
			company: {
				name: 'BukaBukaan',
				logo_url: 'http://i62.tinypic.com/2vhuazt.jpg',
				background_img_url: 'http://dubaiholding.com/wp-content/uploads/2016/04/dubai-group.jpg',
				company_address: 'Jalan Gang anon',
				website: 'www.bukalapak.com',
				category: 'E Commerce'
			},
			why_us: 'kita adalah kompeni ter keren sedunia wao wao wao',
			salary: {
				fee: {
					minimal: 4000000,
					maximal: 8000000
				},
				currency: 'IDR',
				term: 'Bln'
			},
			technical_requirements: ['kita butuh orang jago', 'kita butuh orang keren', 'kita butuh orang wooooo', 'mantab anjeng'],
			job_schedule: {
				start_at: '2016-11-03T06:46:45.562Z',
				end_at: '2017-01-03T06:46:45.562Z'
			},
			tasks: ['ngerjain web', 'ngerjain apps', 'ngerjain si bos'],
			skills_gained: ['ga ada', 'iya ga ada', 'wasting time'],
			experiences_gained: ['skill aja ga ada', 'apalagi ini', 'hoams'],
			contact_person: {
				name: 'Gentor Waskata Triwinosis',
				role: 'Chief Tingtong Officer',
				phone: '+62 857 2834 4446',
				email: 'triwinosis@bl.com'
			},
			job_type: 'internship',
			created_at: '2016-11-03T06:46:45.562Z'
		}
	]
});

function cariInternshipReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case LOAD_DATA_SUCCESS:
    	return state.set('posts', action.payload);
    default:
      return state;
  }
}

export default combineReducers({
  cariInternship: cariInternshipReducer,
  applyInternship: applyInternshipReducer,
});
