import React from "react";
import {
    AccordionDetails,
    AccordionSummary, Alert, AlertTitle,
    Box, Collapse,
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
import {
    APP_STORE_URL,
    INSTAGRAM,
    INSTAGRAM_NAME,
    TWITTER,
    TWITTER_NAME,
} from "../src/utils/utilsConstants";
import MocksLeft from "../src/components/views/MocksLeft";
import MocksRight from "../src/components/views/MocksRight";
import InstagramIcon from "/src/components/svg/instagram-line.svg";
import TwitterIcon from "../src/components/svg/twitter-line.svg";

export default function App() {

    const theme = useTheme();
    const isBigScreen = useMediaQuery(theme.breakpoints.up("sm"));

    const [open, setOpen] = React.useState(true);

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
            <Collapse in={open}>
                <Alert severity="warning" onClose={() => setOpen(false)}>
                    <AlertTitle>Important</AlertTitle>
                    <Typography variant='body2'>Fittree will <strong>never request financial transactions</strong> of
                        any kind</Typography>
                    <br/>
                    <Typography variant='body2'>Fittree will never redirect you to any page other than
                        the <strong>official Fittree socials, socials of a Fittree user, our ProductHunt and IOS App store page</strong></Typography>
                    <br/>
                    <Typography variant='body2'>Fittree will <strong>never request any personal
                        details</strong> from you</Typography>
                </Alert>
            </Collapse>
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
                    <Link target="_blank" href={APP_STORE_URL} sx={{textDecoration: 'none'}}>
                        <Typography sx={{color: "white", fontFamily: "Montserrat", fontWeight: "500"}}>
                            Get it on IOS
                        </Typography>
                    </Link>
                </Box>
            </Box>

            <MocksLeft
                isPriority={true}
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

            <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'center', marginBottom: 4}}>
                <a href="https://www.producthunt.com/posts/fittree?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-fittree" rel="noreferrer" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=359704&theme=light" alt="Fittree - Your&#0032;workouts&#0032;everywhere | Product Hunt" width="250" height="54" /></a>
            </Box>

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
                justifyContent: "space-between",
                marginY: 4
            }}>
                <Typography sx={{fontWeight: "500", fontFamily: "Montserrat"}}>hello@fittree.io</Typography>
                <Box sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
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

            </Box>
        </Container>
    );
}
