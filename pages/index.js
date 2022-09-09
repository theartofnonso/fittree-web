import React from "react";
import {
    AccordionDetails,
    AccordionSummary,
    Box,
    Container,
    Link,
    Typography,
    useMediaQuery,
    useTheme
} from "@mui/material";
import {styled} from "@mui/material/styles";
import MuiAccordion from "@mui/material/Accordion";
import FittrIcon from "/src/components/svg/fittr.svg";
import FittrIconSmall from "/src/components/svg/fittr_small.svg";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {INSTAGRAM, INSTAGRAM_NAME, TWITTER, TWITTER_NAME} from "../src/utils/workout/utilsConstants";
import MocksLeft from "../src/components/views/MocksLeft";
import MocksRight from "../src/components/views/MocksRight";
import InstagramIcon from "/src/components/svg/instagram-line.svg";
import TwitterIcon from "../src/components/svg/twitter-line.svg";

export default function App() {

    const theme = useTheme();
    const isBigScreen = useMediaQuery(theme.breakpoints.up("sm"));

    const Accordion = styled((props) => (
        <MuiAccordion disableGutters elevation={0} square {...props} />
    ))(({theme}) => ({
        border: 0,
        "&:not(:last-child)": {
            borderBottom: 0,
        },
        "&:before": {
            display: "none",
        },
        marginBottom: 15
    }));

    return (
        <Container maxWidth="xl">

            <Link href="/" sx={{textDecoration: "none"}}>
                {isBigScreen ? <FittrIcon/> : <FittrIconSmall/>}
            </Link>

            <Box sx={{marginTop: 2, marginBottom: 10}}>
                <Box>
                    <Typography variant="h3"
                                sx={{
                                    textAlign: "center",
                                    fontWeight: "700",
                                    fontSize: !isBigScreen ? 30 : null,
                                    fontFamily: "Montserrat"
                                }}>
                        Your workouts
                    </Typography>
                    <Typography variant="h3"
                                sx={{
                                    textAlign: "center",
                                    marginBottom: 1,
                                    fontWeight: "700",
                                    fontSize: !isBigScreen ? 30 : null,
                                    fontFamily: "Montserrat"
                                }}>
                        everywhere you go
                    </Typography>
                </Box>

                <Typography variant="h6"
                            sx={{
                                textAlign: "center",
                                marginBottom: 5,
                                fontWeight: "400",
                                fontSize: !isBigScreen ? 13 : null,
                                fontFamily: "Montserrat"
                            }}>
                    Create, share and play workouts on any device
                </Typography>

                <Box
                    sx={{
                        alignItems: "center",
                        backgroundColor: "#ef7a75",
                        borderRadius: 8,
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        width: 200,
                        height: 40,
                        margin: "auto",
                    }}>
                    <Typography sx={{color: "white", fontFamily: "Montserrat", fontWeight: "500"}}>
                        Get it on IOS
                    </Typography>
                </Box>
            </Box>

            <MocksLeft
                title={["Create 5 secs", "exercise videos"]}
                description={["Shoot 5 seconds videos", "to demonstrate an exercise"]}
                url={"d2ez6lox3k9lt0.cloudfront.net/public/fitpin-public/mocks/create_exercise.png"}/>

            <MocksRight
                title={["Curate exercises", "into workouts"]}
                description={["Curate various exercises into", "workouts of Circuits or Reps and Sets"]}
                url={"d2ez6lox3k9lt0.cloudfront.net/public/fitpin-public/mocks/curate_workouts.png"}/>

            <MocksLeft
                title={["Go live", '']}
                description={["launch your workouts", "with an improved experience"]}
                url={"d2ez6lox3k9lt0.cloudfront.net/public/fitpin-public/mocks/go_live.png"}/>

            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{color: "#ef7a75"}}/>}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    sx={{backgroundColor: "#f5ede8", borderRadius: 3, px: 2, py: 1.2}}>
                    <Typography color="#ef7a75" sx={{fontWeight: "bold", fontFamily: "Montserrat"}}>What is
                        Fittree?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography sx={{fontWeight: "300", fontFamily: "Montserrat"}}>
                        Fittree is a link to your workouts. All you need is a fittree.io/username to share with
                        everyone, everywhere.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{color: "#ef7a75"}}/>}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                    sx={{backgroundColor: "#f5ede8", borderRadius: 3, px: 2, py: 1.2}}>
                    <Typography color="#ef7a75" sx={{fontWeight: "bold", fontFamily: "Montserrat"}}>What can I
                        use
                        Fittree for?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography sx={{fontWeight: "300", fontFamily: "Montserrat"}}>
                        Fittree is a tool for fitness influencers like you to create awesome workouts and share
                        them
                        with your followers, clients, brand partners etc. Take your link everywhere your fitness
                        brand
                        exists.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{color: "#ef7a75"}}/>}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                    sx={{backgroundColor: "#f5ede8", borderRadius: 3, px: 2, py: 1.2}}>
                    <Typography color="#ef7a75" sx={{fontWeight: "bold", fontFamily: "Montserrat"}}>Why do I
                        need
                        Fittree?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography sx={{fontWeight: "300", fontFamily: "Montserrat"}}>
                        It is simple, you have a brand (sense of value and reputation) to build, and we have the
                        means
                        to help you achieve that. Fittree is a fit-for-purpose link to the value you have to
                        offer
                        to
                        your community.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{color: "#ef7a75"}}/>}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                    sx={{backgroundColor: "#f5ede8", borderRadius: 3, px: 2, py: 1.2}}>
                    <Typography color="#ef7a75" sx={{fontWeight: "bold", fontFamily: "Montserrat"}}>Is there a
                        Fittree
                        mobile app?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography sx={{fontWeight: "300", fontFamily: "Montserrat"}}>
                        Yes and No, there’s a mobile app for creators to create and share workouts on the fly,
                        whilst
                        workouts are easily accessible on the web via any platform.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{color: "#ef7a75"}}/>}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                    sx={{backgroundColor: "#f5ede8", borderRadius: 3, px: 2, py: 1.2}}>
                    <Typography color="#ef7a75" sx={{fontWeight: "bold", fontFamily: "Montserrat"}}>How can I
                        share
                        my
                        workouts?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography sx={{fontWeight: "300", fontFamily: "Montserrat"}}>
                        All you need is a fittree.io/username link
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{color: "#ef7a75"}}/>}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                    sx={{backgroundColor: "#f5ede8", borderRadius: 3, px: 2, py: 1.2}}>
                    <Typography color="#ef7a75" sx={{fontWeight: "bold", fontFamily: "Montserrat"}}>Can I profit
                        from my
                        Workouts on Fittree?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography sx={{fontWeight: "300", fontFamily: "Montserrat"}}>
                        You can"t monetise your workouts on Fittree at the moment; however, we are working on
                        ways
                        to
                        help you achieve such.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Box sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                marginY: 4
            }}>
                <Box sx={{marginX: 1}}>
                    <Link target="_blank" href={INSTAGRAM + INSTAGRAM_NAME} sx={{textDecoration: "none"}}
                          rel="noopener">
                        <InstagramIcon/>
                    </Link>
                </Box>
                <Box sx={{marginX: 1}}>
                    <Link target="_blank" href={TWITTER + TWITTER_NAME} sx={{textDecoration: "none"}}
                          rel="noopener">
                        <TwitterIcon/>
                    </Link>
                </Box>
            </Box>
        </Container>
    );
}
