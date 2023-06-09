import random
import factory
from faker import Faker
from datetime import datetime, timedelta

from django.conf import settings

from django.contrib.auth import get_user_model

from .models import Fundraiser, FundraiserComment, FundraiserLike

User = get_user_model()

fake = Faker()

user_ids = list(User.objects.filter(is_student=True).values_list("id", flat=True))
fundraiser_ids = list(Fundraiser.objects.values_list("id", flat=True))

# random_photo = random.choice(
#     [
#         "0416-em-pick-your-project-goose-1.png",
#         "243274_The-Ultimate-List-Of-Engineering-Projects-opt-2_061418.png",
#         "dziekan-cpr.jpg",
#         "image.imageformat.1286.871497668.jpg",
#         "projects.png",
#         "test1.jpg",
#     ]
# )


def random_photo():
    return random.choice(
        [
            "0416-em-pick-your-project-goose-1.png",
            "243274_The-Ultimate-List-Of-Engineering-Projects-opt-2_061418.png",
            "dziekan-cpr.jpg",
            "image.imageformat.1286.871497668.jpg",
            "projects.png",
            "test1.jpg",
        ]
    )


class FundraiserFactory(factory.django.DjangoModelFactory):
    """
    Generates random fundraiser objects with randomized students.
    """

    class Meta:
        model = Fundraiser

    @factory.lazy_attribute
    def name(self):
        words = ""

        for _ in range(0, 12):
            words += fake.word() + " "

        return words.strip()

    about = factory.Faker("sentence", nb_words=100)

    @factory.lazy_attribute
    def user(self):
        random_user_id = fake.random_element(elements=user_ids)
        return User.objects.get(id=random_user_id)

    amount_required = factory.Faker("pyint", min_value=1000, max_value=10000)
    amount_raised = factory.Faker("pyint", min_value=1000, max_value=10000)
    start_date = factory.Faker(
        "date_between_dates",
        date_start=datetime.now(),
        date_end=datetime.now() + timedelta(days=30),
    )
    end_date = factory.Faker(
        "date_between_dates",
        date_start=datetime.now(),
        date_end=datetime.now() + timedelta(days=30),
    )
    photos = factory.django.FileField(
        filename="the_file.jpg",
        from_path=f"""{settings.BASE_DIR}/static/images/test/{random.choice([
        "0416-em-pick-your-project-goose-1.png",
        "243274_The-Ultimate-List-Of-Engineering-Projects-opt-2_061418.png",
        "dziekan-cpr.jpg",
        "image.imageformat.1286.871497668.jpg",
        "projects.png",
        "test1.jpg",
    ])}""",
    )

    @factory.lazy_attribute
    def details(self):
        x = ""
        for _ in range(0, 5):
            x += "\n" + fake.paragraph(nb_sentences=20) + "\n"

        return x.strip()


class FundraiserCommentFactory(factory.django.DjangoModelFactory):
    """
    Generates random fundraiser comment objects with randomized students and fundraisers.
    """

    class Meta:
        model = FundraiserComment

    @factory.lazy_attribute
    def fundraiser(self):
        random_fundraiser_id = random.choice(fundraiser_ids)
        return Fundraiser.objects.get(id=random_fundraiser_id)

    @factory.lazy_attribute
    def user(self):
        random_user_id = fake.random_element(elements=user_ids)
        return User.objects.get(id=random_user_id)

    text = factory.Faker("sentence", nb_words=20)
    commented_at = factory.Faker(
        "date_between_dates",
        date_start=datetime.now(),
        date_end=datetime.now() + timedelta(days=30),
    )


class FundraiserLikeFactory(factory.django.DjangoModelFactory):
    """
    Generates random fundraiser like objects with randomized students and fundraisers.
    """

    class Meta:
        model = FundraiserLike

    @factory.lazy_attribute
    def fundraiser(self):
        random_fundraiser_id = random.choice(fundraiser_ids)
        return Fundraiser.objects.get(id=random_fundraiser_id)

    @factory.lazy_attribute
    def user(self):
        random_user_id = fake.random_element(elements=user_ids)
        return User.objects.get(id=random_user_id)

    liked_at = factory.Faker(
        "date_between_dates",
        date_start=datetime.now(),
        date_end=datetime.now() + timedelta(days=30),
    )

    has_liked = factory.Faker("pybool", truth_probability=50)
