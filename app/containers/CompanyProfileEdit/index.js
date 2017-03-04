/*
 *
 * CompanyProfileEdit
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Helmet from 'react-helmet';
import selectCompanyProfileEdit from './selectors';
import Navbar from 'containers/Navbar';
import Footer from 'components/Footer';
import CompanyHeader from 'components/CompanyHeader';
import Dropzone from 'react-dropzone';

import placeholderIcon from './placeholder.svg';

export class CompanyProfileEdit extends React.Component { // eslint-disable-line react/prefer-stateless-function
  state = {
    logo: null,
    header: null,
  };

  onLogoDrop = (files) => {
    this.setState({ logo: files[0] });
  }

  onLogoClick = () => {
    this.logoDropzone.open();
  }

  onHeaderDrop = (files) => {
    this.setState({ header: files[0] });
  }

  onHeaderClick = () => {
    this.headerDropzone.open();
  }

  render() {
    return (
      <div>
        <Helmet
          title="Profil Perusahaan"
          meta={[
            { name: 'description', content: 'Isi Profil Perusahaan' },
          ]}
        />
        <Navbar />
        <CompanyHeader title="Isi Profil Perusahaan" />
        <ContentWrapper>
          <div className="row">
            <div className="small-12 columns">
              <div className="input">
                <span>Nama Perusahaan</span>
                <Input fullWidth placeholder="Ketik nama perusahaan anda" />
              </div>
              <div className="input">
                <span>Kategori Perusahaan</span>
                <Select width="16rem" placeholder="Pilih kategori perusahaan">
                  <option>Design</option>
                  <option>Design</option>
                  <option>Design</option>
                  <option>Design</option>
                </Select>
              </div>
            </div>
          </div>

          <Line />

          <div className="row">
            <div className="small-12 columns">
              <div className="input">
                <span>Logo Perusahaan</span>
                <UploadContainer>
                  <LogoDropZone
                    onDrop={this.onLogoDrop}
                    multiple={false}
                    imageSrc={this.state.logo ? this.state.logo.preview : placeholderIcon}
                    innerRef={(node) => { this.logoDropzone = node; }}
                  />
                  <div>
                    <UploadButton onClick={this.onLogoClick}>Upload Gambar</UploadButton>
                    <span>256px256p | Maks. 2 MB</span>
                  </div>
                  <DeleteButton>Hapus</DeleteButton>
                </UploadContainer>
              </div>

              <div className="input">
                <span>Foto Header</span>
                <UploadContainer>
                  <HeaderDropZone
                    onDrop={this.onHeaderDrop}
                    multiple={false}
                    imageSrc={this.state.header ? this.state.header.preview : placeholderIcon}
                    innerRef={(node) => { this.headerDropzone = node; }}
                  />
                  <div>
                    <UploadButton onClick={this.onHeaderClick}>Upload Gambar</UploadButton>
                    <span>1250px256p | Maks. 2 MB</span>
                  </div>
                  <DeleteButton>Hapus</DeleteButton>
                </UploadContainer>
              </div>
            </div>
          </div>

          <Line />

          <div className="row">
            <div className="small-12 columns">
              <div className="input">
                <span>Situs Perusahaan</span>
                <Input width="23rem" placeholder="http://" />
              </div>
            </div>
          </div>

          <Line />

          <div className="row">
            <div className="small-12 columns">
              <div className="input multiline">
                <span>Deskripsi Singkat Perusahaan</span>
                <textarea placeholder="Tuliskan deskripsi singkat yang menjelaskan perusahaan anda" />
              </div>
            </div>
          </div>

          <Line />

          <div className="row">
            <div className="small-12 columns">
              <SubmitButton className="submit">Simpan</SubmitButton>
            </div>
          </div>

        </ContentWrapper>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = selectCompanyProfileEdit();

const UploadContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  &>div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    span {
      text-align: center;
      margin-top: 0.875rem;
      color: ${props => props.theme.gray};
      font-size: 0.875rem;
    }

  }

  @media screen and (min-width: 40rem) {
    flex-direction: row;
    span {
      margin-left: 1.875rem;
    }
  }
`;


const SubmitButton = styled.button`
  background: ${props => props.theme.lightBlue};
  color: ${props => props.theme.white};
  font-weight: 700;
  padding: 0.75rem 3.5rem;
  border-radius: 3.5rem;
  float: right;
`;

const UploadButton = styled.button`
  background: ${props => props.theme.altGray};
  color: ${props => props.theme.black};
  padding: 0.75rem 2.25rem;
  border-radius: 3.5rem;
  float: right;
  margin-top: 1rem;

  @media screen and (min-width: 40rem) {
    margin-left: 1.1875rem;
  }
`;

const DeleteButton = styled.button`
  font-size: 0.875rem;
  color: ${props => props.theme.black};
  text-decoration: underline;
  margin-top: 1rem;

  @media screen and (min-width: 40rem) {
    margin-left: 1.875rem;
  }
`;

const BaseDropZone = styled(Dropzone)`
  max-width: 100%;
  margin-top: 1rem;
  background-color: ${props => props.theme.lightGray};
  background-size: contain;
  background-position: center;
  ${props => props.imageSrc &&
    `background-image: url(${props.imageSrc});`
  }
`;

const HeaderDropZone = styled(BaseDropZone)`
  width: 27rem;
  height: 4.6875rem;
`;

const LogoDropZone = styled(BaseDropZone)`
  width: 4.25rem;
  height: 4.25rem;
`;

const ContentWrapper = styled.div`
  padding: 4.25rem;

  .input {
    display: flex;
    flex-direction: column;
    line-height: 1.25;
    margin-bottom: 1.4rem;

    &:not(.multiline) {
      @media screen and (min-width: 40rem) {
        flex-direction: row;
        align-items: center;
        line-height: 1;

        & > span {
          width: 15rem;
        }
      }
    }

    & > span, .header > span {
      font-size: 1.25rem;
      font-weight: 700;
      line-height: 1;
      color: ${props => props.theme.black};

      & > em {
        font-weight: normal;
      }
    }

    textarea {
      margin-top: 0.875rem;
      min-height: 6rem;
    }


  }

  input, select, textarea {
    border-radius: 0.15rem;
    box-shadow: inset 0 1px 5px 0 rgba(0, 0, 0, 0.1);
    border: solid 0.1rem ${props => props.theme.gray};
    padding: 0.625rem;

  }
  ::-webkit-input-placeholder {
    color: ${props => props.theme.gray};
  }
`;

const Line = styled.div`
  height: .1rem;
  border: solid .1rem #cccccc;
  margin-bottom: 2.4rem;
`;

const Input = styled.input`
  flex: ${props => (props.fullWidth ? 1 : 0)};
  ${props => props.width && `max-width: ${props.width};`}

  @media screen and (min-width: 40rem) {
    ${props => props.width && `min-width: ${props.width};`}
  }
`;

const Select = styled.select`
  flex: ${props => (props.fullWidth ? 1 : 0)};
  ${props => props.width && `max-width: ${props.width};`}

  @media screen and (min-width: 40rem) {
    ${props => props.width && `min-width: ${props.width};`}
  }
`;

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CompanyProfileEdit);
