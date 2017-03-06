/*
 *
 * Mahasiswa reducer
 *
 */

import { fromJS } from 'immutable';
import {
  INITIAL_FETCH_SUCCESS,
} from './constants';

const initialState = fromJS({
  accepted_num: 0,
  processed_num: 0,
  registered_num: 0,
  rejected_num: 0,
  jobs: [
    // {
    //   job_detail: {
    //     company: {
    //       company_address: "Jalan Haji Kodja No. 11, Kukel, Beji, Depok",
    //       logo_url: "http://static.matchwork.com/company/logo/USA/new1484895145_logo_small.png",
    //       name: "Quint"
    //     },
    //     role: "Software Engineer Intern",
    //     study_references: [
    //       {
    //         contents: [
    //           {
    //             ref_url: "http://www.google.com",
    //             title: "30 Minutes Success idk why but i like to make long words oh god why do we have to handle this why are some people so ... just please dont make this too damn long pls"
    //           },
    //           {
    //             ref_url: "http://www.google.com",
    //             title: "15 Minutes Success"
    //           }
    //         ],
    //         name: "Interview Tips and Trick"
    //       },
    //       {
    //         contents: [
    //           {
    //             ref_url: "http://www.google.com",
    //             title: "30 Minutes Success idk why but i like to make long words oh god why do we have to handle this why are some people so ... just please dont make this too damn long pls"
    //           },
    //           {
    //             ref_url: "http://www.google.com",
    //             title: "15 Minutes Success"
    //           },
    //           {
    //             ref_url: "http://www.google.com",
    //             title: "15 Minutes Success"
    //           },
    //           {
    //             ref_url: "http://www.google.com",
    //             title: "15 Minutes Success"
    //           }
    //         ],
    //         name: "Interview Tips and Trick"
    //       },
    //       {
    //         contents: [
    //           {
    //             ref_url: "http://www.google.com",
    //             title: "30 Minutes Success idk why but i like to make long words oh god why do we have to handle this why are some people so ... just please dont make this too damn long pls"
    //           },
    //           {
    //             ref_url: "http://www.google.com",
    //             title: "15 Minutes Success"
    //           },
    //           {
    //             ref_url: "http://www.google.com",
    //             title: "15 Minutes Success"
    //           },
    //           {
    //             ref_url: "http://www.google.com",
    //             title: "15 Minutes Success"
    //           }
    //         ],
    //         name: "Interview Tips and Trick"
    //       },
    //       {
    //         contents: [
    //           {
    //             ref_url: "http://www.google.com",
    //             title: "30 Minutes Success idk why but i like to make long words oh god why do we have to handle this why are some people so ... just please dont make this too damn long pls"
    //           },
    //           {
    //             ref_url: "http://www.google.com",
    //             title: "15 Minutes Success"
    //           }
    //         ],
    //         name: "Interview Tips and Trick"
    //       },
    //     ]
    //   },
    //   salary: {
    //     currency: "IDR",
    //     fee: {
    //       maximal: 200000,
    //       minimal: 100000
    //     },
    //     term: "bulan"
    //   },
    //   status: "Resume sedang direview",
    //   updated_at: "2017-02-23T18:00:16.359000"
    // },
    // {
    //   job_detail: {
    //     company: {
    //       company_address: "Jalan Haji Kodja No. 11, Kukel, Beji, Depok",
    //       logo_url: "https://media.licdn.com/mpr/mpr/shrink_200_200/AAEAAQAAAAAAAAgDAAAAJGQyNzI2NjBmLTEzMTAtNDM5ZS05MTEyLWYwNzliYzcyMTJmNA.png",
    //       name: "Quint"
    //     },
    //     role: "Product Design Intern",
    //     study_references: [
    //       {
    //         contents: [
    //           {
    //             ref_url: "http://www.google.com",
    //             title: "30 Minutes Success"
    //           },
    //           {
    //             ref_url: "http://www.google.com",
    //             title: "15 Minutes Success"
    //           }
    //         ],
    //         name: "Interview Tips and Trick"
    //       }
    //     ]
    //   },
    //   salary: {
    //     currency: "IDR",
    //     fee: {
    //       maximal: 200000,
    //       minimal: 100000
    //     },
    //     term: "bulan"
    //   },
    //   status: "Diterima",
    //   updated_at: "2017-02-23T18:00:16.359000"
    // },
    // {
    //   job_detail: {
    //     company: {
    //       company_address: "Jalan Haji Kodja No. 11, Kukel, Beji, Depok",
    //       logo_url: "https://upload.wikimedia.org/wikipedia/en/thumb/9/9f/Twitter_bird_logo_2012.svg/1259px-Twitter_bird_logo_2012.svg.png",
    //       name: "Quint"
    //     },
    //     role: "Business Development Intern",
    //     study_references: [
    //       {
    //         contents: [
    //           {
    //             ref_url: "http://www.google.com",
    //             title: "30 Minutes Success"
    //           },
    //           {
    //             ref_url: "http://www.google.com",
    //             title: "15 Minutes Success"
    //           }
    //         ],
    //         name: "Interview Tips and Trick"
    //       }
    //     ]
    //   },
    //   salary: {
    //     currency: "IDR",
    //     fee: {
    //       maximal: 0,
    //       minimal: 0
    //     },
    //     term: "bulan"
    //   },
    //   status: "Ditolak",
    //   updated_at: "2017-02-23T18:00:16.359000"
    // },
  ],
});

function mahasiswaReducer(state = initialState, action) {
  switch (action.type) {
    case INITIAL_FETCH_SUCCESS:
      return fromJS(action.payload);
    default:
      return state;
  }
}

export default mahasiswaReducer;
