/*
 *
 * EditProfile
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { fromJS } from 'immutable';
import { push } from 'react-router-redux';
import { isEmpty } from 'immutable';
import Helmet from 'react-helmet';
import styles from './styles.css';
import { submit, changeUserData } from './actions';
import { fetchUserData } from 'containers/UserAccess/actions';
import { createStructuredSelector } from 'reselect';

import { loading, loadingDone } from 'containers/App/actions';
import SectionTitle from 'components/SectionTitle';

import Navbar from 'containers/Navbar';
import Footer from 'components/Footer';

import { selectGlobal } from 'containers/App/selectors';
import selectEditProfile from './selectors';

export class EditProfile extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    push: React.PropTypes.func,
    submit: React.PropTypes.func,
    global: React.PropTypes.object,
    local: React.PropTypes.object,
    loading: React.PropTypes.func,
    loadingDone: React.PropTypes.func,
    fetchUserData: React.PropTypes.func,
    changeUserData: React.PropTypes.func,
  };

  constructor(props) {
    super(props);

    const userData = this.props.global.get('userData');
    this.state = {
      data: fromJS({
        first_name: userData.get('first_name'),
        last_name: userData.get('last_name'),
        headline:  userData.get('headline'),
        major:  userData.get('major'),
        university: userData.get('university'),
        experiences: {
          achievement_num: userData.getIn(['experiences', 'achievement_num']),
          project_num: userData.getIn(['experiences', 'project_num']),
          work_num: userData.getIn(['experiences', 'work_num']),
        },
        linkedin_url: userData.get('linkedin_url'),
        resume_url: userData.get('resume_url'),
      }),
    };

    this.changeInput = this.changeInput.bind(this);
  }

  componentDidMount() {
    this.props.loadingDone();
  }

  componentWillMount() {
    if(this.props.global.get('token') == '' || this.props.global.get('id') == '') {
      var token = this.getCookie("token");
      var student_id = this.getCookie("student_id");
      if (token !== '' && student_id !== '') {
        this.props.fetchUserData({token: token, student_id: student_id});
      } else {
        this.props.push('/mahasiswa/login');
      }
    } else {
      this.props.changeUserData(this.props.global.get('userData'));
    }
  }

  componentWillUnmount() {
    this.props.loading();
  }

  getCookie(cname) {
      var name = cname + "=";
      var ca = document.cookie.split(';');
      for(var i = 0; i < ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) == ' ') {
              c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
              return c.substring(name.length, c.length);
          }
      }
      return "";
  }

  changeInput(evt, field) {
    const value = evt.target.value;
    const data = this.props.local.data;
    data[field] = value;
    this.props.changeUserData(fromJS(data));
  }

  changeExperience(evt, field) {
    const value = evt.target.value;
    const data = this.props.local.data;
    if(data.experiences === '') {
      data.experiences = {
        achievement_num: 0,
        project_num: 0,
        work_num: 0,
      }
    }

    data.experiences[field] = value;
    this.props.changeUserData(fromJS(data));
  }

  render() {
    const data = this.props.local.data ? fromJS(this.props.local.data) : fromJS({});
    return (
      <div>
      <Helmet
        title="Ubah Profil - Quint.id"
        meta={[
          { name: 'description', content: 'Ubah Profil - Quint.id' },
        ]}
      />
        <Navbar />
        <div className={styles.editProfile}>
          <div className="row">
            <div className="small-12 columns">
              <SectionTitle>Edit Profil</SectionTitle>
            </div>
            <div className="small-12 medium-5 columns">
              <h2>nama depan*</h2>
              <input type="text" placeholder="Ketik nama depan" value={data.get('first_name')} onChange={(evt) => this.changeInput(evt, 'first_name')} />
              <h3 style={{display: this.props.local.message.firstName ? 'block' : 'none'}}>{this.props.local.message.firstName}</h3>
            </div>
            <div className="small-12 medium-5 columns end">
              <div className={styles.marginContent}>
                <h2>nama belakang</h2>
                <input type="text" placeholder="Ketik nama belakang" value={data.get('last_name')} onChange={(evt) => this.changeInput(evt, 'last_name')} />
              </div>
            </div>
            <div className="small-12 medium-10 columns">
              <h2>headline*</h2>
              <input type="text" placeholder="Ketik headline profil anda" value={data.get('headline') === 'iniDefaultEntryQuint' ? '' : data.get('headline')} onChange={(evt) => this.changeInput(evt, 'headline')} />
              <h3 style={{display: this.props.local.message.headline ? 'block' : 'none'}}>{this.props.local.message.headline}</h3>
            </div>
            <div className="small-12 columns" />
            <div className="small-12 medium-5 columns">
              <h2>Jurusan*</h2>
              <input type="text" placeholder="Ketik jurusanmu di sini" value={data.get('major') === 'iniDefaultEntryQuint' ? '' : data.get('major')} onChange={(evt) => this.changeInput(evt, 'major')} />
              <h3 style={{display: this.props.local.message.major ? 'block' : 'none'}}>{this.props.local.message.major}</h3>
            </div>
            <div className="small-12 medium-5 columns end">
              <div className={styles.marginContent}>
                <h2>Universitas*</h2>
                <input type="text" placeholder="Ketik universitasmu di sini" value={data.get('university') === 'iniDefaultEntryQuint' ? '' : data.get('university')} onChange={(evt) => this.changeInput(evt, 'university')} />
                <h3 style={{display: this.props.local.message.university ? 'block' : 'none'}}>{this.props.local.message.university}</h3>
              </div>
            </div>
            <div className="small-12 columns">
              <h2>Pengalaman</h2>
            </div>
            <div className="small-12 medium-5 columns end">
              <div className={styles.marginContent}>
                <h2>Jumlah Prestasi</h2>
                <input type="number" min={0} placeholder="Jumlah" value={data.getIn(['experiences', 'achievement_num'])} onChange={(evt) => this.changeExperience(evt, 'achievement_num')} />
                <h2>Jumlah Proyek</h2>
                <input type="number" min={0} placeholder="Jumlah" value={data.getIn(['experiences', 'project_num'])} onChange={(evt) => this.changeExperience(evt, 'project_num')} />
                <h2>Jumlah Organisasi/Pekerjaan</h2>
                <input type="number" min={0} placeholder="Jumlah" value={data.getIn(['experiences', 'work_num'])} onChange={(evt) => this.changeExperience(evt, 'work_num')} />
              </div>
            </div>
            <div className="small-12 columns">
              <h2>Profil Selanjutnya</h2>
            </div>
            <div className="small-12 medium-5 columns end">
              <div className={styles.marginContent}>
                <h2>URL LinkedIn</h2>
                <input type="text" placeholder="Ketik url disini" value={data.get('linkedin_url')} onChange={(evt) => this.changeInput(evt, 'linkedin_url')} />
                <h2>URL Resume*</h2>
                <input type="text" placeholder="Ketik url disini" value={data.get('resume_url') === 'http://iniDefaultEntryQui.nt' ? '' : data.get('resume_url')} onChange={(evt) => this.changeInput(evt, 'resume_url')} />
                <h3 style={{display: this.props.local.message.resume ? 'block' : 'none'}}>{this.props.local.message.resume}</h3>
              </div>
            </div>
            <div className="small-12 columns">
              <button onClick={() => this.props.submit(data.toJS())}>Simpan</button>
            </div>
            <div className="small-12 columns">
            </div>
          </div>
        </div>
        <Footer hasMargin={true} />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  global: selectGlobal(),
  local: selectEditProfile(),
});

function mapDispatchToProps(dispatch) {
  return {
    submit: (data) => dispatch(submit(data)),
    loading: () => dispatch(loading()),
    loadingDone: () => dispatch(loadingDone()),
    fetchUserData: (data) => dispatch(fetchUserData(data)),
    push: (url) => dispatch(push(url)),
    changeUserData: (data) => dispatch(changeUserData(data)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
