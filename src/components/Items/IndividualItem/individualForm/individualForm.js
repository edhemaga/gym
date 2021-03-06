import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import "./individualForm.css";
import useStyles from "./styles";

import { addToBasket } from "../../../../actions/purchases";
import { Button, Snackbar } from "@material-ui/core";

function IndividualForm({ item }) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [orderData, setOrderData] = useState({
    name: item.name,
    image: item.selectedFile[0],
    size: "",
    color: "",
    price: item.price,
    discount: item.discount,
  });
  console.log(
    "Pogledati liniju ispod, pokaznog karatkera su quantity i minimalQuantity; izbrisati liniju nakon što se uredi struktura svakog artikla sa ovim svojstvima"
  );
  item = Object.assign(item, { quantity: 0 }, { minimalQuantity: 15 });
  const history = useHistory();
  /*--- MODAL */
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState({
    msg: "",
    autoClose: 2000,
    position: { vertical: "bottom", horizontal: "center" },
  });

  const handleOpen = () => {
    if (
      item.name == "Nano Sports Quick Drying Towel" &&
      orderData.color != ""
    ) {
      setMessage({
        ...message,
        msg: (
          <div
            style={{
              background: "#3f4042",
              color: "white",
              paddingTop: 20,
              paddingBottom: 20,
              paddingLeft: 80,
              paddingRight: 80,
              borderRadius: 5,
            }}
          >
            <div>Uspješno ste dodali artikal u korpu!</div>
          </div>
        ),
        autoClose: 1000,
        position: { vertical: "bottom", horizontal: "center" },
      });
    } else if (orderData.size != "" && orderData.color != "") {
      setMessage({
        ...message,
        msg: (
          <p
            style={{
              background: "#3f4042",
              color: "white",
              paddingTop: 20,
              paddingBottom: 20,
              paddingLeft: 80,
              paddingRight: 80,
              borderRadius: 5,
            }}
          >
            <div>Uspješno ste dodali artikal u korpu!</div>
          </p>
        ),
        autoClose: 2000,
        position: { vertical: "bottom", horizontal: "center" },
      });
    } else {
      setMessage({
        ...message,
        msg: (
          <p
            style={{
              background: "#3f4042",
              color: "white",
              paddingTop: 20,
              paddingBottom: 20,
              paddingLeft: 80,
              paddingRight: 80,
              borderRadius: 5,
            }}
          >
            <div>Morate izabrati boju i veličinu artikla!</div>
          </p>
        ),
        autoClose: 2000,
        position: { vertical: "bottom", horizontal: "center" },
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  /*---------------*/

  function handleSubmit(e) {
    e.preventDefault();
    if (
      item.name == "Nano Sports Quick Drying Towel" &&
      orderData.color != ""
    ) {
      try {
        dispatch(addToBasket(orderData));
        setOrderData({
          name: item.name,
          image: item.selectedFile[0],
          size: "",
          color: "",
          price: item.price,
          discount: item.discount,
        });
        clearStyle();
      } catch (error) {
        console.log(error);
      }
    } else if (orderData.size != "" && orderData.color != "") {
      try {
        dispatch(addToBasket(orderData));
        setOrderData({
          name: item.name,
          image: item.selectedFile[0],
          size: "",
          color: "",
          price: item.price,
          discount: item.discount,
        });
        clearStyle();
      } catch (error) {
        console.log(error);
      }
    }
  }

  function handleSubmitA(e) {
    if (orderData.size != "" && orderData.color != "") {
      try {
        dispatch(addToBasket(orderData));
        history.push("/items/basket");
      } catch (error) {
        console.log(error);
      }
    } else {
      handleOpen();
    }
  }

  function setColorStyle(e, length) {
    for (var i = 0; i < length; i++) {
      var el = document.getElementById("color" + i);
      el.style.background = "white";
    }
    e.target.style.background = "#dbdbdb";
  }

  function setSizeStyle(e, length) {
    for (var i = 0; i < length; i++) {
      var el = document.getElementById("size" + i);
      el.style.background = "white";
    }
    e.target.style.background = "#dbdbdb";
  }

  function clearStyle() {
    for (var i = 0; i < item.sizes.length; i++) {
      var el = document.getElementById("size" + i);
      el.style.background = "white";
    }
    for (var i = 0; i < item.colors.length; i++) {
      var el = document.getElementById("color" + i);
      el.style.background = "white";
    }
  }

  return (
    <div>
      <form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <div style={{ marginTop: 0, marginBottom: 10 }}>
          <h2 style={{ marginTop: 0, marginBottom: 3 }}>{item.name}</h2>
          {/* {item.quantity < item.minimalQuantity ? (
            <span style={{ fontSize: 13, color: "rgb(244,67,54)" }}>
              Dostupno: <b>{item.quantity}</b> kom.
            </span>
          ) : null} */}
        </div>
        {item.discount > 0 ? (
          <h3 style={{ marginTop: 0, marginBottom: 7 }}> -{item.discount}%</h3>
        ) : null}
        {item.discount > 0 ? (
          <div>
            <del style={{ marginRight: 10, color: "#969696" }}>
              {item.price}KM
            </del>
            <span style={{ fontSize: 20, fontWeight: "bold" }}>
              {(((100 - item.discount) / 100) * item.price).toFixed(0)}KM
            </span>
          </div>
        ) : (
          <span style={{ fontSize: 20, fontWeight: "bold" }}>
            {item.price}KM
          </span>
        )}

        <p style={{ maxHeight: "30vh", overflow: "auto" }}>
          {item.description}
        </p>

        <div style={{ marginBottom: 30 }}>
          {item.name != "Nano Sports Quick Drying Towel" ? (
            <div>
              {item.sizes.map((size, indx) => (
                <span
                  style={{
                    marginRight: 10,
                    paddingTop: 5,
                    paddingLeft: 10,
                    paddingRight: 10,
                    paddingBottom: 5,
                    background: "white",
                    fontSize: 15,
                    borderBottom: "1px solid #031292",
                  }}
                  id={"size" + indx}
                  onClick={(e) => {
                    setOrderData({ ...orderData, size: size });
                    setSizeStyle(e, item.sizes.length);
                  }}
                >
                  {size}
                </span>
              ))}
            </div>
          ) : (
            " "
          )}
        </div>
        <div>
          {item.colors.map((color, indx) => (
            <span
              style={{
                marginTop: 10,
                paddingTop: 5,
                marginRight: 10,
                paddingLeft: 10,
                paddingRight: 10,
                paddingBottom: 5,
                background: "white",
                fontSize: 15,
                borderBottom: "1px solid #031292",
              }}
              id={"color" + indx}
              onClick={(e) => {
                setOrderData({ ...orderData, color: color });
                setColorStyle(e, item.colors.length);
              }}
            >
              {color}
            </span>
          ))}
        </div>
        <div style={{ margin: 20 }}></div>
        <Button
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
          onClick={handleOpen}
        >
          {item.reservation || item.quantity === 0
            ? "Dodaj Rezervaciju u Korpu"
            : "Dodaj u Korpu"}
        </Button>
      </form>
      <Snackbar
        anchorOrigin={message.position}
        open={open}
        onClose={handleClose}
        autoHideDuration={message.autoClose}
      >
        <span>{message.msg}</span>
      </Snackbar>
    </div>
  );
}

export default IndividualForm;
