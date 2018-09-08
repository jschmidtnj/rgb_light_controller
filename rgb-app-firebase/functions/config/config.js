var config = {
    "firebaseadmin": {
        "type": "service_account",
        "project_id": "rgb-light-controller",
        "private_key_id": "15d6474155c0e1a20c5948691bd0f730d47282d3",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCzbJMDXRZbDtnq\nvLyhLmHwiFWoXc6cNNOVXZ/aKvQaYMV940NoTpPgdxwie/X7hgKLmF8/Q+USQfWd\nvZqF1NaA+mPBpiFG/e519IpY/mSx/Kt3ZaPTXnGpJQQh6ukEHf4It/ZRg5rPYxxu\nQpZ0C8M7VizqX1Qze6TC0tMtPwqtkPTImPVgVXQ6E06pp+dnU9kqI4mZxgzy1fER\n5e5M8Sa7RT5Xn2f1cg4qDe4TLPJEZVVr4C6B/uQGoIK2hvkTbKh72WDSYohUBCRR\nbB6qa9b3mprLFTahtEokaSSCHkLHcIbANPN3a3a0DgVUf4U71BFANRmQDD3K3M37\no8vjRggJAgMBAAECggEADlnf7LwIbU+ZNAU/xCzze1D4TaTKgWQt9pY8EoVELDZI\neEV8zy4Wdgoo4gQ5Zv0aHS7FPYhGx/37xo++Do15JmyrR80BKo5l1qGbjZCJdCgM\n0e+7WbfF47zOIWVf7mr0tkn6kHIJkvlvMngufwkwJtdBdUdF3ZlP6B+t8Zec2R2A\nPKLkj5J5GMc+1RvDOSQG4Ajmf7o9SnHfmLC5C/TNSpH4PvxCpmTg8hFDwvFOyurQ\nYzcw5/79SJP9cjnlyRvOLq0XZdCjD5R2Fmvh2tqU42Q7FyGyBEDA37ZdCs6t6vwo\nHnOUShyBT+8v5vj/I2wwSV4VdX0c/ucKkkjSc1s55QKBgQDnps+3+sd1+uszyg5n\n7YwWvBnMO/pY9pQnraOnR4ZQw57fsVyO/Cbd2EIx2lfyG1VivYqWd/LtCwV10Ggo\nbJiX1+HkRURIu1UrRkpeVTcwRsy3jBmVVgowZH/HXXnK55eeI125flPttqOhmcrS\np9LtqHoCJcf0gA9jHrEmQQKgpQKBgQDGSHJP9/21ORR/5m2W48G+XX5Ed81SaogB\nGGpiseWh+4L0nTWs3tSrP8sNPq1I2gCFWoe2Cl6I30qMpGKXnBFL7PHKEYSVoO+V\nknX+d21jVVjOQcG7AsUhOjub/wwjb2eFJYSYMu7oCK9NeN7IFjE3ko1iZI2oGsX8\nwZJbdTXolQKBgGJBuR2ae3wpgBYpgE7IzYDfLDoavqd5f4IM/rt3dRtQvlS3kED9\n5yZ2Ei2/JUqGGYOWTfBg1GODJz+/tE5hMaBGa4Q9dSc8fnWqjOTSVGRfw3mfLULQ\nieXY2vIfTgeokAD9k0WYtdTAgUuMRiFwGeHAcm/ywouMvfoXDKDjNlAZAoGAJiL3\nAZSEEqAI5lSujU//Cps21vpn3kspH3TPuW3X6eDTHjNCiJ5PLyTU7BY7BAESCpQP\n+B5kclToJMbVQ6270euf0aqu4oySqCUEVs4nluxqaTlShqKQwcROhMF4VzRtJ7nA\nl/lr4+sPtInj534FN1gTo3INoOCNZgDhIoAXv0UCgYEAwrrM/2NR+nn2EoDrASJL\nOzkO/5PKjb+pKxBaPz5kl1NTawDxRsqF71Hx0J4cyYS9zJn+evZyk93yAF8C7eZ7\nc/k5L6wqGU6SOjJUBt60HCGTacQ/3z2iSTXlgbsWRqYIv5SajA7knH04Snuxu4aK\nQPMzbHkphIZlpG9U0xXSvUw=\n-----END PRIVATE KEY-----\n",
        "client_email": "firebase-adminsdk-7mdhv@rgb-light-controller.iam.gserviceaccount.com",
        "client_id": "100306440027238058425",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-7mdhv%40rgb-light-controller.iam.gserviceaccount.com"
      },
    "other": {
        "databaseurl": "url",
        "datatimeout": 1000,
        "maxconcurrentaccountdeletions": "3",
        "daysofinactivity": "30",
        "accountcleanupcronjoburl": "https://us-central1-rgb-light-controller-app.cloudfunctions.net/accountcleanup?key=04eda352470370b797680e2b80a9c8aaa80c3a39",
        "secretKey": "04eda352470370b797680e2b80a9c8aaa80c3a39"
    }
};

module.exports = config;