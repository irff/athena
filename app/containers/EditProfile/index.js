/*
 *
 * EditProfile
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import Helmet from 'react-helmet';
import styles from './styles.css';
import { submit } from './actions';

import SectionTitle from 'components/SectionTitle';

import Navbar from 'containers/Navbar';
import Footer from 'components/Footer';

export class EditProfile extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    submit: React.PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      data: Map({
        firstName: '',
        lastName: '',
        major: '',
        university: '',
        achievement: '',
        project: '',
        job: '',
        linkedIn: '',
        resume: ''
      }),
    };

    this.changeInput = this.changeInput.bind(this);
  }

  changeInput(evt, field) {
    const value = evt.target.value;
    this.setState(({data}) => ({
      data: data.update(field, firstName => value)
    }));
  }

  render() {
    const data = this.state.data;
    return (
      <div>
      <Helmet
        title="EditProfile"
        meta={[
          { name: 'description', content: 'Description of EditProfile' },
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
              <input type="text" placeholder="Ketik nama depan" value={data.get('firstName')} onChange={(evt) => this.changeInput(evt, 'firstName')} />
            </div>
            <div className="small-12 medium-5 columns end">
              <div className={styles.marginContent}>
                <h2>nama belakang*</h2>
                <input type="text" placeholder="Ketik nama belakang" value={data.get('lastName')} onChange={(evt) => this.changeInput(evt, 'lastName')} />
              </div>
            </div>
            <div className="small-12 columns" />
            <div className="small-12 medium-5 columns">
              <h2>Jurusan*</h2>
              <input type="text" placeholder="Ketik jurusanmu di sini" value={data.get('major')} onChange={(evt) => this.changeInput(evt, 'major')} />
            </div>
            <div className="small-12 medium-5 columns end">
              <div className={styles.marginContent}>
                <h2>Universitas*</h2>
                <input type="text" placeholder="Ketik universitasmu di sini" value={data.get('university')} onChange={(evt) => this.changeInput(evt, 'university')} />
              </div>
            </div>
            <div className="small-12 columns">
              <h2>Pengalaman</h2>
            </div>
            <div className="small-12 medium-5 columns end">
              <div className={styles.marginContent}>
                <h2>Jumlah Prestasi</h2>
                <input type="number" placeholder="Jumlah" value={data.get('achievement')} onChange={(evt) => this.changeInput(evt, 'achievement')} />
                <h2>Jumlah Proyek</h2>
                <input type="number" placeholder="Jumlah" value={data.get('project')} onChange={(evt) => this.changeInput(evt, 'project')} />
                <h2>Jumlah Organisasi/Pekerjaan</h2>
                <input type="number" placeholder="Jumlah" value={data.get('job')} onChange={(evt) => this.changeInput(evt, 'job')} />
              </div>
            </div>
            <div className="small-12 columns">
              <h2>Profil Selanjutnya</h2>
            </div>
            <div className="small-12 medium-5 columns end">
              <div className={styles.marginContent}>
                <h2>URL LinkedIn</h2>
                <input type="text" placeholder="Ketik url disini" value={data.get('linkedIn')} onChange={(evt) => this.changeInput(evt, 'linkedIn')} />
                <h2>URL Resume*</h2>
                <input type="text" placeholder="Ketik url disini" value={data.get('resume')} onChange={(evt) => this.changeInput(evt, 'resume')} />
              </div>
            </div>
            <div className="small-12 columns">
              <button onClick={() => this.props.submit(data.toJS())}>Simpan</button>
            </div>
          </div>
        </div>
        <Footer hasMargin={true} />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    submit: (data) => dispatch(submit(data)),
  };
}

export default connect(null, mapDispatchToProps)(EditProfile);
