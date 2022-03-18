import { ethers } from "ethers";
import axios from 'axios'
import React, {useEffect, useState} from 'react'
import AuthorProfile from "../AuthorProfile/AuthorProfile";
import { NFTStorage } from 'nft.storage'

import Swal from 'sweetalert2'

import diverseNftAbi from '../../abi/contracts/DiverseNFT.sol/DiverseNFT.json'
import { DiverseNftAddress } from '../../constants.js'


export default function Create() {
  const [file, setFile] = useState(null)
  const [name, setName] = useState('')
  const [desc, setDesc] = useState('')

  const [uploadLoadingState, setUploadLoadingState] = useState(false)

  const NFT_STORAGE_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDRFOWFBOUFGZkFkMTk3M2M4NmUxQjNEODA0OTU0OTc5ODYxRjE0NTkiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY0NzUxMTQzMDY5OSwibmFtZSI6ImRlbW8ifQ.tuQF7fhWdmIUYGjUBCfOhioWcDWedrLIAe8JFWzxQcA'

  async function handleSubmit(){
    if(file == null || name == '' || desc == ''){
      Swal.fire({
        title: 'Missing Parameters!',
        icon: 'error',
        confirmButtonText: 'Okay'
      })
      return
    };

    let provider = new ethers.providers.Web3Provider(window.ethereum)
    let signer = provider.getSigner()
    let nftContract = new ethers.Contract(DiverseNftAddress, diverseNftAbi, provider);
    let nftContractSigner = nftContract.connect(signer);

    if(nftContract == null || nftContractSigner == null){
      Swal.fire({
        title: 'Nft Contract Not Connected',
        icon: 'error',
        confirmButtonText: 'Okay'
      })
      return
    };

    setUploadLoadingState(true)

    // const client = new NFTStorage({ token: NFT_STORAGE_TOKEN })
    const formData = new FormData()
    formData.append('name',name);
    formData.append('desc',desc);
    formData.append('nftImage',file);

    
    console.log(formData)

    axios.post('http://localhost:3500/nftUpload',formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "boundary": formData._boundary,
      },
    }).then(function (response) { console.log(response); }).catch(function (error) { console.log(error); });

    // const metadata = await client.store({
    //   name: name,
    //   description: desc,
    //   image: file
    // })

    // let nftResult = await nftContractSigner.userMint(metadata.url)

    setUploadLoadingState(false)

    // if(nftResult){
    //   Swal.fire({
    //     title: 'NFT Created!',
    //     text: metadata.url,
    //     icon: 'success',
    //     confirmButtonText: 'Damn Diverse'
    //   })
    // }

  }

  return (
    <section className="author-area">
      <div className="container">
        <div className="row justify-content-between">
          <div className="col-12 col-md-4">
            {/* Author Profile */}
            <AuthorProfile />
          </div>
          <div className="col-12 col-md-7">
            {/* Intro */}
            <div className="mt-5 mb-4 intro mt-lg-0 mb-lg-5">
              <div className="intro-content">
                <span>DEV Summit 2022 - NFT Marketplace WorkShop</span>
                <h3 className="mt-3 mb-0">Create NFT</h3>
              </div>
            </div>
            {/* Item Form */}
            <form className="item-form card no-hover" onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}>
              <div className="flex row">
                <div className="col-12">
                  <div className="relative z-20 cursor-pointer input-group form-group">
                    <div className=" custom-file">
                      <input type="file" onChange={(e) => {
                        if(e.target.files.length > 0){
                          setFile(e.target.files[0])
                        }
                      }} className="cursor-pointer" id="inputGroupFile01" required />
                      <label className="relative z-20 cursor-pointer custom-file-label" htmlFor="inputGroupFile01">{ file == null ? 'Choose Picture' : file.name }</label>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="mt-3 form-group">
                    <input 
                      onChange={(e) => { 
                        setName(e.target.value)
                      }}
                      value={name}
                      type="text" className="form-control" name="name" placeholder="Item Name" required />
                  </div>
                </div>
                <div className="col-12">
                   <div className="form-group">
                     <textarea 
                       onChange={(e) => {
                         setDesc(e.target.value)
                       }}
                       value={desc}
                       className="form-control" name="textarea" placeholder="Description" cols={30} rows={3} defaultValue={""} required/>
                   </div>
                 </div>
                {/* <div className="col-12 col-md-6"> */}
                {/*   <div className="form-group"> */}
                {/*     <input type="text" className="form-control" name="price" placeholder="Item Price" required="required" /> */}
                {/*   </div> */}
                {/* </div> */}
                {/* <div className="col-12 col-md-6"> */}
                {/*   <div className="form-group"> */}
                {/*     <input type="text" className="form-control" name="royality" placeholder="Royality" required="required" /> */}
                {/*   </div> */}
                {/* </div> */}
                {/* <div className="col-12 col-md-6"> */}
                {/*   <div className="form-group"> */}
                {/*     <input type="text" className="form-control" placeholder="Size" required="required" /> */}
                {/*   </div> */}
                {/* </div> */}
                {/* <div className="col-12 col-md-6"> */}
                {/*   <div className="form-group"> */}
                {/*     <input type="text" className="form-control" name="copies" placeholder="No of Copies" required="required" /> */}
                {/*   </div> */}
                {/* </div> */}
                {/* <div className="col-12"> */}
                {/*   <div className="mt-3 form-group"> */}
                {/*     <div className="form-check form-check-inline"> */}
                {/*       <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" defaultValue="option1" defaultChecked /> */}
                {/*       <label className="form-check-label" htmlFor="inlineRadio1">Put on Sale</label> */}
                {/*     </div> */}
                {/*     <div className="form-check form-check-inline"> */}
                {/*       <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" defaultValue="option2" /> */}
                {/*       <label className="form-check-label" htmlFor="inlineRadio2">Instant Sale Price</label> */}
                {/*     </div> */}
                {/*     <div className="form-check form-check-inline"> */}
                {/*       <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" defaultValue="option3" /> */}
                {/*       <label className="form-check-label" htmlFor="inlineRadio3">Unlock Purchased</label> */}
                {/*     </div> */}
                {/*   </div> */}
                {/* </div> */}
                <div className="col-12">
                  <button className="mt-3 btn w-100 mt-sm-4" disabled={uploadLoadingState} type="submit">{ uploadLoadingState ? 'Uploading...' : 'Create NFT' }</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

