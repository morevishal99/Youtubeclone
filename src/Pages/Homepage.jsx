import { CloseIcon, HamburgerIcon, SearchIcon } from '@chakra-ui/icons';

import { Box, Flex, Image, Input, Text } from '@chakra-ui/react'
import React, { useRef, useState } from 'react'
// import Navbar from '../Component/Navbar'
import { Loader } from './Loader';

const Homepage = () => {
    // const key = "AIzaSyAtHEZ7b7sanhEJOvGO6cCXBhsFsjBIKpI"
    const key=process.env.KEY
    const [query, setquery] = useState();
    const [data, setdata] = useState([]);
    const [sidebar, setsidebar] = useState(false);
    console.log('data: ', data);
    const ref = useRef(null);
    const focus = () => {
        setquery("")
        ref.current.focus();
    }
    const getData = async () => {
        // let query = document.getElementById("query").value;

        // setdata([])
        try {
            let res = await fetch(`https://youtube.googleapis.com/youtube/v3/search?q=${query}&key=${key}&part=snippet&maxResults=30`);

            let { items } = await res.json();

            let youtube = items;
            console.log(youtube)
            setTimeout(() => {

                setdata(items)
            }, 3000)

        } catch (error) {
            console.log(error);
        }


        // appenddata(youtube)
    }
    const searchfunction = (value) => {
        alert(value)
        setquery(value)
        // getData()
    }
    const handleSidebar = () => {
        setsidebar(!sidebar)
        // alert(sidebar)
    }
    return (
        <>
            {/* navbar */}
            {/* <Box border={"1px solid red"}> */}
            <Box position={"sticky"} zIndex={9} top="0" bg={"white"} marginTop={"30px"} >
                {/* box with input and logo */}
                <Box width={"97%"} margin="auto" display={"flex"} justifyContent={"space-between"} placeItems="center" position={"sticky"} zIndex={9} top="0" bg={"white"} marginTop={"30px"}>
                    {/* logo */}
                    <Flex gap={"20px"}>

                        <Box onClick={handleSidebar} padding={"5px"} fontSize="25px"><HamburgerIcon /></Box>

                        <Box >
                            <Image width={"100px"}
                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAN0AAAB8CAMAAADaWkVjAAAA7VBMVEX////+/v7+AAAoKCgAAAAjIyP6AAD+//z3AAAODg74+PgdHR0XFxfo6OiOjo7l5eXZ2dk0NDSnp6c+Pj7x8fF5eXnR0dFKSkq3t7dfX1/Ly8tDQ0PsAADiAAAvLy//+fzpf3xXV1fAwMD/7u3hLyv519L3//SGhoZtbW3cLi72//+bm5vvkozmRErjFxbuxMr34eT10tXwvrfzr6zznpvwo6Pyt7T2ycP98en1ybjmnJLtdW/oRULtZmTfV1zxQkfPBwDfe4Xkq6D5HB3lVk/VIRv46djWLzXXZWb1tafkkJfpKifwcHTghIDssLhUNWyAAAALVUlEQVR4nO1ai3/aOBK24veDtwmPAA4QIIGEhubRdJtk9+6yd3vX7v7/f87NjGxjG2EbSLtNfv5+LZFtWZrPI82MRpIYY5KPdSkCfO4/4FXpl6VCElaI3c1RZX0jq7+tLfoiF+yi7DLpZXb/w9hFngu4JbvIpLYfcirTvxv/u/WV988uIvfGoIyP3PXIjHeQ7E44nuJVfwgOZyetP1dS2XEisao/Bu+cXbLP5KSL1GQ/WriDUbALHrC3x44JPcE2dm8M75xdzM5t47mN++ZfFovaIn5PWHXjb/AFc7hTlpwsAmd7ELugEPkrZCdtq5oiqThMSnlH9MpPxG7r3VdgFzyJy//GUbB7u9hlkrH1XIq8H7YTazR5iyXmn0CQLeKl1I09TM6/fdlltbknu13u5mWXSTNmhdZkU7vPgfT3xA936CvuPtMClk12Md3n7jHeezq7LeN0h/bpN9LdDuyir+XuMd57Brv8c3NLA/QbeUnM7S2jYPd2sW265UfYSKwxcevBzdgjgSxiCeM3g0fJu2n970VvD3YbVeOVxd//52InqCpgJ6C3ZXDtyu5QZgUKFChQ4J2DOwtdh//Su/IajM0Z85jnMaYD8JcKwUUU5DLpj46vzv9u2bOBWvNJeECRCtOpngTdgu/APH4lvQ0dz0kdHmhwPgeB6QeHKPDwAaUgHzHHDzGHOvBF3gY9EJzGmq6Pr69Xqw8f729ub28vLy9PfUDx9vbu5v7jp0+ryfhB59y/Pzc/O3lYG6i58edfvlydLZf9fr8XwvDRM/h1H7Fcnj0+/fJ57GXlLrL7TasFT12EdSA7tCY3z8RFi+AoBv8GPUG+/V9vxjR+I/LEhdtVjI03qkNAq70HoyhgVN71e0c7QvvtH57Pzi0j6hZNTKmOFzM3XTFSd1aOY2ZtsHNs2zbrB7Lz9H/2DS2bT4Kd0b+ccgpuR3EcpVUisS3ZNB2lkW5y4BvAK1GYipWsVFVlWbYPZccmj4axKzmAcbZCWwoNLBxZVmvHJHZFAZnMWZY9rcMrMWxnd6D1uuvtww5szaUv0QjlMEckxwjZKaOsPtuOCvCZYTHJjr0Wu+eecGAmDUuSndF7fODBSuUEBFEWVC6DUuxG+rRDdmoNMCByWKo534mdfmYI2WUo1NCM5TWJwaRzW5adc5TP6mCxuTHMkigdA6pNHJ9mG8vHyc02YKe+ArtxX8hOo3/boR0Z/U8+uzoMR1V24arSApGcDFMQyls2cRiXEndDdq+huw99zdgkoqE3zxib/XtfEDIlShXKIzkwMHFxI66bzrbyDBZnV+Ghbpxckl2sQu5tOkm67wG7jVEIAw/+peuudxe0YePEa6MWQV516EZ9Mwv3W0jCaLowyi4kvsGORT5PrN087MhkJnloxr9efk8dmsBOOw0aaZo426A0w8KMenaro3Z7VLEknnW0AC66bCpZVpxdcA8cZvA09HfucXtUtfyoE6Z2BdrtVjKnNkKXLoW+XDv7/OmFP0HzIlAjBGSnQZcjVFnLktyWTf6ASW79REGYw5GFH77UqTUatXOYmwxLDXL+ATvJmg3g3gmOaCrZVSm0Ku0GttOscM1a7SG1qwzbWeGsziBWPO2LjL/xdcL+ffef3hE3OaIamvFHwK5SU2V1UJIqJC5QcJumzZ2Zo9LgqrTAw5kdZHcCJbsRZ9c04d4A2TUV9H5V35ur9bZDDZlNvr8zC9rFIC2LHawPvgEDEbvVfDofn57BuAX7IlAuxNzPQRjtok+wR+TLnQ70WlbAl6k2SqIqXeSPxtQmdqhfNckuDHfIS4Ts5E6Ns5OpFamtqNQu/XazhiWw+yJkd3Q2wXyEPjnt9cCAbtJDq/MSDv6FTaMIxVVgqpQUsp2zcxTVGR7AznY655xdGVopYStqq9wcoOOZZegO2HlPxhZ2uEz32MN/H8Fl9DZdBsy7x3HQEgZj9kxCX66AjHVyEW1mcXoVaX92C9elajZ+I4r5BiPGytjGsJSLnWhWXUw8zB4Bv+ndBSyQNq2qcXQxDoZ+CYIxkB0+qY3+AFmqA3h4TEF1fT92+AaGPRaNBIgW2IIcDtzqEvNqKjsGZuXhyhBFJRrobsptua5fX/Zx7sVVDB/lYixxv8NQKLWFvtwpM+IKoRk8rMhcqfvqjvu7EypWJBoKdgfdxSCciinsPDa+EsZcITtJn3oe+/zUS8Rr6CMi7GAsqo0yMoDVNPVtNlGnDV8BB7Eb2lxTFr5qN30jjfFDuu4y2cE/z7M8b/KixUenFtddCQWtodhVxseNWfZHLJE6iB2fvceSW6NvFXw1JT2ezac7mJ0P/7vqb8y7CDv0Ytxw07jhC75ZwA6n/wHs/HvOSHL5VMSPmYsd0x8y2IETffj4ROuI2NCM686PiGmZx2D1lmBX2duqkO4w0IuyAwebhx0m+541QZwJHmHlYerZk6wJzTmgFjWtlBwLPQJI0PWd7vHrsQtHZjlgR168MxqN2jU5Fzv2ZIjZTdh0CtHsNYQrIt3CO8aVt26LFuhgIa3vyY6SFappmpSWycPumyFc332dQJw2fbjBlJJomY55zZeIQbb4QruJ0nxX3fE8DOVislbJYDJOe6J1nPZ1Jc2tj48YZuJab3MBCKP1ObLaomBMNslIf1/d8UQMQM3WnXS5Jc5cSZ9Pl7BCp/m2WQOj6D+i7Oqvzi60KrOo7uzzqo/jSrru0NzfinV3dnO79INnYf5Io/VdlJ2znd2reIRuxGaGvaaDSTfAYZOf1l+mp981WDhcRpuPsEv4u1fy5sBu4Ps7WMwHS/UMdvc9HHkb0sOqLo0c1bjdwo7HKmt25wdGYh0/EnMbPBKDbmfnzXI5PYomrPpH6fmhrez8nNgmO4oCMYpmlSB2ysnO99wJdg1yBCXJ6mAUfS6Bo2qZtpOd8ub5TIFJpNGXwW6yhZ1LVE6gVCV7sAAlDnECnpR8WUXs5EGXLzYSViVYC2NSyqEVEPNjlYzFOWJbLjoD4O+W42g7a3b+REGxcUEmm13cKKIsRNXfaUiwY9wq1n21R3SHeaYFvuF0/D7UWjXf+o7j2767JF/G0VkdZUcM7NaoTqvqAUaiTZo7J3UaeQl2vsFVB4uZTAHdem3uyDx9wZc7FBDZw3a9EYzzLLD7/l6zTuvdxE50RNlZLbywFcUPmBjP42IKyXSaMG6T7EgX+NTsYAJqza5m86gLM27QMk9CKAoZ5TxZeO/hRTDvsqAZvcdrPak7lbMDadVgg05VzikL61KCDC47JRika3YqsSN7gaqyK5R58uedWqs3/NfKtNJyG6Yatpu500RfenJGu+Y7slt+0mP54Lo6GAxssiqYGugMTITdWFAaGQg3HLgeNC02UwfyCbGz4RWTIo5SyzEdE+IQqW3LA2IHZkYeStUhRs1q2d+4dps13u7JwsqznzD12MeL/k5OAeKU3u93khXTXaWL4GkqTBp36+XZbNGuBstbqVqH6y7IVMWKOGeo0LXoaaldni1GrsRKcGuECV98Bh6wNFqUF91wl8SqQrvlxaiSb6tE9zx9cgqRCa4FUIOpWsTg2ej1f3uaeJIXWQCF3zE4u4w/yYCCWbHryCthdRZvRwrPPocbKZEdk3wEodZ4dX/755fn55erx4uLi7OvBDq/slwusXx28Xjx+PLy9PTlz19uPoz1/PtMfzcYnYFjnjUe03GjyWr1gfDXXx98rODu5BqeP3gs3H97K4Cl0JQOgM0l+p3zHYLYcRt9zg+o4Bk4PAX3ZsBP93vBHzr5FoIu+PnF+XxK6enEMaOfGDRP8fginrnU2Vx0KDMo+Yc4WcohsQIFChQoUKBAgQIFChQoUKBAgQIFChQoUKBAgQIFChQoUOBnx/ve9H6/e/r/B2BQDB0b7J9CAAAAAElFTkSuQmCC"
                                alt="" />
                        </Box>
                    </Flex>
                    {/* input tag */}
                    <Flex width={"40%"} border="1px solid grey" justifyContent={"space-between"} borderRadius="10px" padding={"10px"}>
                        <Input ref={ref} value={query} width={"50%"} variant='unstyled' type="text" onInput={(e) => setquery(e.target.value)} placeholder="Search" />
                        {/* <Button onClick={() => getData()}> <SearchIcon/></Button> */}
                        <Flex gap={"20px"}>
                            {query ?
                                <CloseIcon color={"grey"} margin="6px" onClick={() => focus()} /> : ""
                            }
                            <SearchIcon color={"grey"} margin="6px" onClick={() => getData()} />
                        </Flex>
                    </Flex>
                    {/* userdetail */}
                    <Flex gap={"30px"}>

                        <Box textAlign="center" placeItems={"center"} alignItems="center" justifyContent={"center"}  >
                            <Image padding={"5px"} width={"30px"} marginLeft="auto" marginRight={"auto"} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAAflBMVEX///8AAAD7+/tXV1f39/cvLy8fHx+3t7eXl5dTU1NPT09LS0tvb28ICAjm5ubf3982NjaLi4sVFRXFxcVGRka/v7/V1dVcXFysrKzy8vJ5eXk6Ojrs7OxoaGgnJycgICCCgoKSkpKlpaXY2Nhra2ufn59BQUE5OTnNzc0XFxczMGtBAAAEKklEQVR4nO3dfV+qMBTA8YEYVqKJT6CiZlne9/8GL+S1y9PG5s7YmZ/z+zOn9g1LmxsyRlEURVEURVEURVEURVEURVEUpdtlM3juoSzxjTLSZ6+v9iuDjmDbm8Pz4g9zkFmPDs9bmIMceoV4U1OOtF+HdzIFmfYMOROEIAQhCBhk7Jsp6R1i6D5CgihEEIUIohJBFCKISgRRyADEPy8OT9VKdxI9mSku3UdcveiwPe7ucEyGHr7ipbIjwOjIHwjKs139zvzIpzxHhPOA5E0UIba/X26KvyW+7e+XW0gQZHVC/HC9PyxGvuOQ6fHf0/Zw4jDET17/DxwGdUg0tN2TFGS6+VMhz+qQl65HpfFG3ZAgWdSP3bD4umOQj3FcZ+SPpOISlyDBifOOYHGhO5BV28FwDpKe33gKlyCXLBIwXIGko84X6MUw7JD5Wnww3IDs3uX+WyquihiylDkYDkC4f2x/2pdfzRRXxQsRFK2XrPSq0VXI8L2Y9XIdEmXz61C3IW+j9DbUYUiUXUpDASB+8jkYK04NSCaAbM9pZag+5LK/HmUTFB4kHjdmULUhq99nKQOUdsjXKWgO1YaU/7cBp7RA4k37kkddyKp6N8CUBmTBXU2rCznV7wqUUoU8bQSLHXUhLQcfkFK+9a9QuLTZAASQIjEddMsIBIxiHwJEwQABoeCAAFCwQLQpeCCaFEwQLYolyB6cYgkSzhtvVWhSbEEYA6bYgwBTbEJAKXYhgBTbEDCKfQgQBQMEhIIDIqJs5RbEYYEIKNGlORgzhE/Zy2wuxgThUhLnIByKzEpobBCWDpqQtXuQdNb2/t/GNUg7w/PmbkF4DLkFyWggXIa3l1qPjATCZ0TjtPXWUEJEDNnl4QggEAwEEBiGdQgUwzIEjmEVAsmwCIFlWIMkwAxrEN4Ct3sZyGbj72eggugwEEH0GGggugwkEH0GCggEAwEEhmEdAsXoFXI2yKhChIuc9CHlU/5AMxrHm7/sTB+yM8hoeeDyFgICrGnMzDHafwNbl2YCQNLbZid4Bu9vYstiWYh1v2lmiiF4uv0+1+eTIJaU75JRKDdPpZrgBVB1QbnTa+O94aj043MZUuyA+Z0Kdxvi3bbBPADkujHpISB5+9nEHci3ePNe+dLiqnghoex2SvQQ1r3b2BlIseVYtP/bIUje5bPrsBSjHIAwFpzFZ00vxjgBYcITJbgFKU5d8fUYkLyP2pldnIUUmzlb1uvEP5eUvvAa2O69C8JKZz/6bVGH4Io/r+WHL82RLkLyJsf/n5pwXT/lKCRvObg+T459xyGM7UbZ+nib93IZUulhIEz23CO9J7PirlyfH2KjUqQ6c9bYDo2kTNHBWH+fj6TSQf2Mv0HWfbO9t73rY3tWx/UAVWP10xZTFEVRFEVRFEVRFEVRFEVRFEXJ9RdP22jdO9TLywAAAABJRU5ErkJggg==" />
                            <Text fontSize={"13px"}>Home</Text>
                        </Box>
                        <Box textAlign="center" placeItems={"center"} alignItems="center" justifyContent={"center"}  >
                            <Image padding={"5px"} width={"30px"} marginLeft="auto" marginRight={"auto"} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAflBMVEX///8AAABVVVV3d3fr6+tpaWmKiorV1dX19fXy8vL8/Pzi4uL4+Pjf39+oqKiurq7IyMienp49PT2UlJTT09MODg5FRUXNzc20tLRjY2MmJiaampouLi6Dg4NwcHBeXl67u7seHh4WFhZXV1dMTEw2NjY7OzuFhYUpKSlERES1WfSmAAAJNklEQVR4nO2dbVvjKhCGG9vaN62t2qrValJ1d/3/f/CculqeIUMIZCaJe3F/VApMYF6YEBgMEolEIpFIJBKJRCLROy5mo9Gs607osVi/PGVZttkOV/Ou+6LB5UNmKNZdd0ee84xSTLrukSyzt6zEsutOSXLxVBYwy/6lmcqM4JG8636JYevgiVHXPRNi4RIwe+66a0IMnRJmi677JsLMLWC277pzIlyBRO/LuxUZ0q47J8KzkWf8+YdbkPCy486JUJRGbGn+knfYMTGMOI9ff5mbP/U4sFntx8O8Vkkjzv33n65LQlcyunl+fmzZd168fPbv7aJG2UoJb2pUcG/9ug1G37p1VqNwUwnvvsueN+hxIHem07m/NFP4I0RC8zjGbS2c702fs6G/uCn8cP7FLkBCjPm2dbSiOWDrvz1cJVkVfgknWPy9jSTPI+lh0BhGSUjj9kLfpN7QHt5Vl56t9kWlhNnr2hd908XlQVtES8CHysKr50O1eH/ZVgs5oaU3uiLSKZq9VhSdPnpGj1RUNRdWtGyhqYtL2tZvd8lFxaKQZVfh0Bc0zbPTEzGnnbpydylUviN/3PVZqbprLb9oKcTKVW66j5DvyLuzysErKfiiIt9gRLvj1JyrLJ5Xpxl5JuVUcgNTogwbV8p64cgc1sWZRKUTQ2PV9UBacAlo2SJ8Jtvx8PxxvVyub/bDFzZF/Mmby3VQET2OOALqCB0Cfi2qSmxv8tGUlJzPJkuXOXJZVVp+6igVyx2p/ZYvNNlwY7d324/F1QfzC2coSHTxrblQCLUyOV/IciafPLvF+8tifV3+1ZnD4xGLKrtcJLPPoeVWvPM/h5taEdZdeW4/8co4J+orqYrEfjgimbITXNZ2zJdlGfk0I5lLBznHTxYwDm9L/VVWLwNjmJScDG/MMNdaZ3FaEzQHT7wNs+3iOHgFcG/V4BCRxBM+Ja8LmaP87LGnaB7RzGxsVcI3hZNlJ5PVIHOfj46tVaPLFPqwh5GvZgclKlY3AeCj5Ve8Vs/CNBCxlknv7BBd+sc5DPT1/OKTaH+zVxFTGhvyD3QNJST8/jvUx2r2rCC9ariLhJosfjqg3c2bNTegtot/KU3tfOMsCn3pzz5TtAyHpu3NMZfEOgpiZSSSfdRssXqB87TpnhWsi435id5vRN7Lk1HkVRFUp2i2yJgWpqotW+IXdkfojS6Jj9jniuav1gs6JziErAkh4bZUiEFUe8POU3RhTdw+aiG7aCPRQLOHiczQq7MNY6jcRBPRkLIq5o8G4iBpPXbuY5zYoCFYs7PZLexIQ4238Hr1KRSIfzuM6XRWG1BfxJSwZtVgcX9FtwJJA3YI0aJJb1FDRWPfpeNWK0feKKgR1pPjylw69UWsNCsBaGLs4z33VIFa6H7nEAvmZFgj5h0AL7ixl/WFECTHa4Kb3CcBrEPiUuCgZWw4g9Ysj2rBA4Rm7Bpj5emgFxgidg6Cs3yPasAHDiJbAOKCmIAYNp/xZgQiUqXtShBRsQ4DnGZMPAVzwBuwRVRfB0iBsaYOuvAUUT1MUvYBQvNa27FA0ws2vIawIGKa+oZo20wJagFPmU3hgykIt6aQXmLjGZghwm+BgFX9TtTZQ0iBkIJ9fNC43rcvU2MteX9g4spDcI4WpjhrSSFmUvykAFZnrNMHaxoam47Mwol//3F2+v91aLcDAJfImjvIEoWaO1BD1t3PzBOosXkvGog92bAGgteq/VkcoIbsEhuazgOrDqLwTCWYxoGrG/PLJ/Y9JLyqUP1kwvSjYP8f3Y+LP6cf8m9ETdp2o7o1GeIKth1QxDCPOPP90Phinaj7G3BK/BiZ/4ftk4KK+f0AxpnIvWrmAH3nE0EmtAqz6eBneE9anP4vlyVlMR3xvpwNqtf4801cw2L41AVMTVAqw0xCh5sx9eaBXQ7EmDz+XSKYmqB8Zuapdx5ZbzjmWfOWBHoStA73TUKwtfKbBAkmtnakDAvPYPDAqoQfIigQm42tiUmoOYx2nFUHAXj1hQLKpz+MfQIYzxyUFzYC8P/vkYQm6gmy6id/6PB2PZLQrHLC3pR+Tf8XR9DZIwlP8VeoUf8cRWd+ok8SDi6PxuYsYokzqogReiXhsT/i7fZNQnmShHIkCbVIEsqRJNQiSShHklCLJKEcSUItkoRyJAm1SBLKkSTUIkkoR5JQiyShHElCLZKEciQJtUgSypEk1CJJKEeSUIskoRxJQi2ShHJ0JeGiAwklz2zwAzvdlc9mNvuxdT8KsIFPapRbgp3q7RzI/kVxarbxKUYeYKd6m5cjQLPaFxqBTXtv78Y9+HRP+2OEwRy+ym/t+ocZHnCmfs79b2ispZvayOk4+k6KHLWl+a3jCXoWsvJO/SPkbNM39Tkzp+eUKh0dTiCDmG2Uv2AZWadUt3KBj3U2quqnZPZZyNqG9Avrsb6In/Zzwr7HsBW9H9jzNMt2Sh/mTs+shtoL9q3zQ5XCm4l930ib1zPao6gxfUoH5it/O2ox2lrN/xI2cnP7rOeN8kd5NXog6jZm9snw1x3ckVq6N0PwBgg84/OTbi7XvNxZ3ZALU20daPUWO2BqH04vNVHXtFotb1QH6+Dwg4zvt+6Xeej05nfr7ieZFSN9bl1fpj2iRk/i6idcZLfvJBiI25AwCeT+wV5cpO0/YjwMyDq1m3V2A1kGx6EWQYAa6q1aAok97oPHLJliTu7TASyqgGU3z4s/x6gLctExBH/fA0P6lzNRCWFGFC1k1mpwAbkGicPiyPX229ez7sEAXCSocdyl1g9EZhV32Vhf+JAQEK+N7h25jIQTf0sdEXpWopPynXE9QS7Iir06VRnJpXgfR9Fxg2Ast0XXAtnsxXMN93Y+qkuKocrRvovVzbAP/F5OWt14kkgkEolEopr1eR32Hb7MakrNtXNvcnjh2PtTHChvFdfE3l3g4AfP0tLmApZdb96HhFPay8QSfkVMj6glYdevlRtRSxEV76nRp04iUu8ypVao4S9+sDc84rc1YlndrvBq4o/WwiPzp2oBW9pIrcmiUsC2NlKrclch4I9Xwr9MNi4B/4kRPDJ64wUU3ALbOWtGvrcfvKRgmFk7Q7MP5a97uiAffzuOw8fjvzV+hsVklee3E4lNoYlEIpFIJBKJRCKRSATxH/hWYx2XIvhVAAAAAElFTkSuQmCC" />
                            <Text fontSize={"13px"}>Home</Text>
                        </Box>
                        <Box textAlign="center" placeItems={"center"} alignItems="center" justifyContent={"center"}  >
                            <Image padding={"5px"} width={"30px"} marginLeft="auto" marginRight={"auto"} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAAflBMVEX///8AAAD7+/tXV1f39/cvLy8fHx+3t7eXl5dTU1NPT09LS0tvb28ICAjm5ubf3982NjaLi4sVFRXFxcVGRka/v7/V1dVcXFysrKzy8vJ5eXk6Ojrs7OxoaGgnJycgICCCgoKSkpKlpaXY2Nhra2ufn59BQUE5OTnNzc0XFxczMGtBAAAEKklEQVR4nO3dfV+qMBTA8YEYVqKJT6CiZlne9/8GL+S1y9PG5s7YmZ/z+zOn9g1LmxsyRlEURVEURVEURVEURVEURVEUpdtlM3juoSzxjTLSZ6+v9iuDjmDbm8Pz4g9zkFmPDs9bmIMceoV4U1OOtF+HdzIFmfYMOROEIAQhCBhk7Jsp6R1i6D5CgihEEIUIohJBFCKISgRRyADEPy8OT9VKdxI9mSku3UdcveiwPe7ucEyGHr7ipbIjwOjIHwjKs139zvzIpzxHhPOA5E0UIba/X26KvyW+7e+XW0gQZHVC/HC9PyxGvuOQ6fHf0/Zw4jDET17/DxwGdUg0tN2TFGS6+VMhz+qQl65HpfFG3ZAgWdSP3bD4umOQj3FcZ+SPpOISlyDBifOOYHGhO5BV28FwDpKe33gKlyCXLBIwXIGko84X6MUw7JD5Wnww3IDs3uX+WyquihiylDkYDkC4f2x/2pdfzRRXxQsRFK2XrPSq0VXI8L2Y9XIdEmXz61C3IW+j9DbUYUiUXUpDASB+8jkYK04NSCaAbM9pZag+5LK/HmUTFB4kHjdmULUhq99nKQOUdsjXKWgO1YaU/7cBp7RA4k37kkddyKp6N8CUBmTBXU2rCznV7wqUUoU8bQSLHXUhLQcfkFK+9a9QuLTZAASQIjEddMsIBIxiHwJEwQABoeCAAFCwQLQpeCCaFEwQLYolyB6cYgkSzhtvVWhSbEEYA6bYgwBTbEJAKXYhgBTbEDCKfQgQBQMEhIIDIqJs5RbEYYEIKNGlORgzhE/Zy2wuxgThUhLnIByKzEpobBCWDpqQtXuQdNb2/t/GNUg7w/PmbkF4DLkFyWggXIa3l1qPjATCZ0TjtPXWUEJEDNnl4QggEAwEEBiGdQgUwzIEjmEVAsmwCIFlWIMkwAxrEN4Ct3sZyGbj72eggugwEEH0GGggugwkEH0GCggEAwEEhmEdAsXoFXI2yKhChIuc9CHlU/5AMxrHm7/sTB+yM8hoeeDyFgICrGnMzDHafwNbl2YCQNLbZid4Bu9vYstiWYh1v2lmiiF4uv0+1+eTIJaU75JRKDdPpZrgBVB1QbnTa+O94aj043MZUuyA+Z0Kdxvi3bbBPADkujHpISB5+9nEHci3ePNe+dLiqnghoex2SvQQ1r3b2BlIseVYtP/bIUje5bPrsBSjHIAwFpzFZ00vxjgBYcITJbgFKU5d8fUYkLyP2pldnIUUmzlb1uvEP5eUvvAa2O69C8JKZz/6bVGH4Io/r+WHL82RLkLyJsf/n5pwXT/lKCRvObg+T459xyGM7UbZ+nib93IZUulhIEz23CO9J7PirlyfH2KjUqQ6c9bYDo2kTNHBWH+fj6TSQf2Mv0HWfbO9t73rY3tWx/UAVWP10xZTFEVRFEVRFEVRFEVRFEVRFEXJ9RdP22jdO9TLywAAAABJRU5ErkJggg==" />
                            <Text fontSize={"13px"}>Home</Text>
                        </Box>
                       
                    </Flex>
                </Box>
                {/* box with category */}
                <Box fontWeight={500} width={"100%"} color="grey" margin="auto" marginBottom={"10px"} padding="10px" display={"flex"} justifyContent={"space-around"} placeItems="center" bg={"white"} marginTop={"10px"}>
                    <Text bg={"rgb(220,226,233)"} onClick={() => searchfunction("All")} padding="5px" borderRadius={"10px"}>All</Text>
                    <Text bg={"rgb(220,226,233)"} onClick={() => searchfunction("music")} padding="5px" borderRadius={"10px"}>Music</Text>
                    <Text bg={"rgb(220,226,233)"} onClick={() => searchfunction("Games")} padding="5px" borderRadius={"10px"}>Games</Text>
                    <Text bg={"rgb(220,226,233)"} onClick={() => searchfunction("Comedy")} padding="5px" borderRadius={"10px"}>Comedy</Text>
                    <Text bg={"rgb(220,226,233)"} onClick={() => searchfunction("Cartoon")} padding="5px" borderRadius={"10px"}>Cartoon</Text>
                    <Text bg={"rgb(220,226,233)"} onClick={() => searchfunction("Romantic")} padding="5px" borderRadius={"10px"}>Romantic</Text>
                    <Text bg={"rgb(220,226,233)"} onClick={() => searchfunction("Movies")} padding="5px" borderRadius={"10px"}>Movies</Text>
                    <Text bg={"rgb(220,226,233)"} onClick={() => searchfunction("Funny")} padding="5px" borderRadius={"10px"}>Funny</Text>
                </Box>
            </Box>

            {/* </Box> */}

            {/* map data */}
            <Box display={"flex"}>
                <Box position="sticky" top={120} height="600" zIndex={9} padding="10px"   >
                    <Box textAlign="center" placeItems={"center"} alignItems="center" justifyContent={"center"}  >
                        <Image padding={"5px"} width={"30px"} marginLeft="auto" marginRight={"auto"} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjJb7Lidyv3UAYcW8Jb5pw6WGEbcy9WgySgQ&usqp=CAU" />
                        <Text fontSize={"13px"}>Home</Text>
                    </Box>

                    <Box padding={"15px"} textAlign="center">
                        <Image padding={"5px"} width={"30px"} marginLeft="auto" marginRight={"auto"} src="data:image/png;base64,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" />
                        <Text fontSize={"13px"}>Shorts</Text>
                    </Box>

                    <Box padding={"15px"} textAlign="center">
                        <Image padding={"5px"} width={"35px"} marginLeft="auto" marginRight={"auto"} src="data:image/png;base64,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" />
                        <Text fontSize={"13px"}>Subscriptions</Text>
                    </Box>

                    <Box padding={"15px"} textAlign="center">
                        <Image padding={"4px"} width={"35px"} marginLeft="auto" marginRight={"auto"} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAAeFBMVEX///8AAAD8/PwJCQnj4+Py8vIpKSlCQkIEBATOzs4WFhb6+voODg5dXV0iIiJ5eXm0tLSWlpbX19fq6uozMzMdHR2Hh4dZWVmnp6ff399HR0dUVFTExMQ6OjrS0tIuLi5nZ2dxcXF/f39jY2OLi4ufn5+5ublMTEw5BBLOAAAEw0lEQVR4nO2da3eiMBBAeRYQUHlZVNZW2ur//4e73SU8PeuQhEzKmftNVuLcwoRJgKxhEARBEARBEARBEARBEARBEMTasBZmscCz/ef7Pd9ubN9Uhx8VL97r7isIJVlcdi8Kw3+A7X0exTUCD9eiwbsJetxUnkz/xRM7KshnVR+7FPBwsKMfkKxFxBQ4Jlvs2AfY/Hmy/5fs0WmX3IJjFi53rRpjhe4x+HP9yvvdzYm/vVtu2udKXfxT3PLUmVQCDWFKNFTtGf6KHYogGbsM2LLqFSwqdkhEr/Do5I3IATsQUWqJSTJv/CB5BLJvRH7NC/lS1rH3VkTAAYh/CrqdA8+ecY3rNWJHxZsX1+Xlkdal+dYWbpEl92h2FHZrEvBp9InuSTaOihVLEVQjjfkKd4818EvY4xs/Todxuc0/2DCN8Mo7/vCbDj6U4vHd4HVwybDYdpCH88b/u5ZkEdPMnX5sbCvIQ6DWlXxq/WXbN2EbAR4h//EwowtrRUKyt7z1zi62DSBy5f5B+37pmrmc5KlceUTSfp6/xIeyOmauwtLXcrO0Kg9xf5rA70ZScJH3ziJxnn99OZykc+kOCVgkZFdBP0EfgVif7OyI2ljAIm2hLDBXIY+ERdMOCcEih+aLW/Tj8Y1VNOG0ZTtY5HXaUWBybcKJ2QawCBu5iMznSaRswmnLdrAIO5bB028qIWBnOtsAFmGdFmrP2zEp28EirMNzF40PzKRsB4uwL2rRaXVVtM82zBZZNLwZjOMhEWxIhEQWgkRIZCFIhFtkoYd5VItcTrZ/X6L0Vyxy+Vf9x/KLf8Ui7M6xvZNd/isW6SYVN5JnkRSLmD1e9rOjnRGPQhHT9CRmPaqIzKxHFpGX9dgi0rIeX0RS1iOJjO7tSMh6JJHjqzlEOOuRRKYPCItmPZqIYexHz9aKZT2iiGElm6GKSNZjihiGu5OW9bgihuHEQxPurMcWkZb1+CKSsl4HESlZr4XIo6xPH+0+o2UkkWnWRzNNtBGZZP1drGVEkVHWg59GfNwyifD9XJ/RqXUWaxlNxBkV9j802VfS/a7lgriSEmUlRaO0wTuuyEoGVmsZ6q5k8mEl00GrmaBbzZTpgJ88id1jJbcV1nKjZyW33lZyM3TR29OTx2ehOwJR9sBA1nx8PvLnE7k3ey3+CEfafCzm7ggkVfVQza35mM/dEUp6jqKzgsec2Hs6z+diOEUWYxQPK0nruTuiM4yHvQUOWCpBbxF2QOznfYrWIqzzhUxXai3COl/IAi9ai7C3PSFL7mgt0vS+NmTeVW8Ro/5TDG1BKwdpLmK41cPVOZ7viA13PKsT0fX1PTC6v1AJRvdXXMHo/tIxGN1fAwej+4v5YNgQrNCi2wonSyWAaRev0GJxNPZn5VjPsF1OxKzRV94L2UJt5obj/HhnO5vFYe7dfamkddGGwpOxx/6SO8W5Lqs0c9Wt+WmFrpNWX/W56IXhcy1eejW1Y8f1NxFZlmoZcs5sFVkobAm23OWSkz9vXR25QNkX7rRZzNvfiV0F0g+JS6/xY3+ILxXvfnEsOCmV6Pwla1SUlvXHSfH/QeDbm21++jiUqFdjgiAIgiAIgiAIgiAIgiAIgiAIgiAIgiAIgiC04jcUoTzDWhQsVgAAAABJRU5ErkJggg==" />
                        <Text fontSize={"13px"}>Library</Text>
                    </Box>
                </Box>
                <Box display={"grid"} gridTemplateColumns={"repeat(3,1fr)"} gap="20px" width={"80%"} margin="auto" marginTop={"30px"}>
                    {data.length > 0 ? data.map(({ snippet: { title }, id: { videoId } }) =>

                        <Box>
                            {/* <iframe src={title} /> */}
                            <iframe width="100%"
                                height="300"
                                title='video'
                                allow="fullscreen" src={`https://www.youtube.com/embed/${videoId}`} frameBorder="0"></iframe>
                            <Text>{title}</Text>
                        </Box>
                    ) : <Loader />}
                </Box>
            </Box>


        </>
    )
}

export default Homepage