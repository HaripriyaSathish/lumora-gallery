from django.db import models
from cloudinary.models import CloudinaryField


class SingletonModel(models.Model):
    """Base class for models that should only ever have one row."""
    class Meta:
        abstract = True

    def save(self, *args, **kwargs):
        self.pk = 1
        super().save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        pass

    @classmethod
    def load(cls):
        obj, created = cls.objects.get_or_create(pk=1)
        return obj


class SiteSettings(SingletonModel):
    site_name = models.CharField(max_length=100, default="LUMORA STUDIO")
    phone_number = models.CharField(
        max_length=20,
        help_text="Include country code, e.g. +919876543210"
    )
    whatsapp_number = models.CharField(
        max_length=20,
        help_text="Include country code, no + or spaces, e.g. 919876543210"
    )
    whatsapp_message = models.CharField(
        max_length=255,
        default="Hi, I'd like to enquire about a photoshoot."
    )
    email = models.EmailField()

    def __str__(self):
        return "Site Settings"


class HeroSection(SingletonModel):
    title = models.CharField(max_length=200, default="Illuminating Life's Beautiful Moments")
    subtitle = models.TextField(
        default="The best for all your photography needs, immortalizing your moments in immersive art."
    )
    background_image = CloudinaryField('image')
    primary_button_text = models.CharField(max_length=50, default="Book Now")
    primary_button_link = models.CharField(max_length=200, default="#contact")
    secondary_button_text = models.CharField(max_length=50, default="View Portfolio")
    secondary_button_link = models.CharField(max_length=200, default="#portfolio")

    def __str__(self):
        return "Hero Section"

class SpecialtiesSection(SingletonModel):
    eyebrow_text = models.CharField(max_length=100, default="What We Do")
    heading = models.CharField(max_length=200, default="Our Specialties")

    def __str__(self):
        return "Specialties Section"


class SpecialtyItem(models.Model):
    label = models.CharField(max_length=100, help_text="e.g. Weddings, Portraits, Newborns")
    image = CloudinaryField('image')
    order = models.PositiveIntegerField(default=0, help_text="Lower numbers show first")

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.label    


class StatItem(models.Model):
    value = models.PositiveIntegerField(help_text="The number, e.g. 500")
    suffix = models.CharField(max_length=10, blank=True, default="", help_text="e.g. +, %, or leave blank")
    label = models.CharField(max_length=100, help_text="e.g. Sessions Captured")
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"{self.value}{self.suffix} - {self.label}"    

class FeaturedWorkSection(SingletonModel):
    eyebrow_text = models.CharField(max_length=100, default="Portfolio Highlights")
    heading = models.CharField(max_length=200, default="Featured Work")
    subtext = models.CharField(
        max_length=255,
        default="A closer look at the moments we've had the honor to capture."
    )

    def __str__(self):
        return "Featured Work Section"


class FeaturedShoot(models.Model):
    tag = models.CharField(max_length=100, help_text="e.g. WEDDING, PORTRAIT")
    title = models.CharField(max_length=200)
    story = models.TextField()
    image = CloudinaryField('image')
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.title   

class StudioSection(SingletonModel):
    eyebrow_text = models.CharField(max_length=100, default="Meet the Studio")
    name = models.CharField(max_length=100, default="Elena Voss")
    role = models.CharField(max_length=150, default="Founder & Lead Photographer")
    bio_paragraph_1 = models.TextField(
        default="I started Lumora after photographing my sister's first morning as a mother — one frame, no direction, and everything already there. Twelve years later I still work the same way: quietly, in natural light, waiting for the room to forget I'm in it."
    )
    bio_paragraph_2 = models.TextField(
        default="Every session is built around your people and your pace, never a shot list."
    )
    quote = models.TextField(
        default="A photograph should feel less like a pose and more like a memory you can hold."
    )
    image = CloudinaryField('image')

    def __str__(self):
        return "Studio / Founder Section"


class ProcessSection(SingletonModel):
    eyebrow_text = models.CharField(max_length=100, default="How We Work")
    heading = models.CharField(max_length=200, default="From Vision to Frame")

    def __str__(self):
        return "Process Section"


class ProcessStep(models.Model):
    number = models.CharField(max_length=10, help_text="e.g. 01, 02, 03")
    title = models.CharField(max_length=100)
    description = models.TextField()
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"{self.number} — {self.title}"
    
class TestimonialsSection(SingletonModel):
    eyebrow_text = models.CharField(max_length=100, default="Testimonials")
    heading = models.CharField(max_length=200, default="Client Stories")

    def __str__(self):
        return "Testimonials Section"


class Testimonial(models.Model):
    name = models.CharField(max_length=100)
    shoot = models.CharField(max_length=100, help_text="e.g. WEDDING, FAMILY SESSION")
    quote = models.TextField()
    avatar = CloudinaryField('image')
    rating = models.PositiveSmallIntegerField(default=5)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.name    

class InstagramSection(SingletonModel):
    heading = models.CharField(max_length=200, default="Follow the Studio")
    handle = models.CharField(max_length=100, default="@lumorastudio")
    profile_url = models.URLField(default="https://instagram.com")

    def __str__(self):
        return "Instagram Section"


class InstagramImage(models.Model):
    image = CloudinaryField('image')
    alt_text = models.CharField(max_length=200, blank=True, default="")
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"Instagram Image #{self.order}"   

class CTASection(SingletonModel):
    eyebrow_text = models.CharField(max_length=100, default="Book a Session")
    heading = models.CharField(max_length=200, default="Let's Make Something Worth Keeping")
    subtext = models.TextField(
        default="We take a limited number of commissions each month so every story gets the attention it deserves. Tell us about yours."
    )
    background_image = CloudinaryField('image')
    footer_note = models.CharField(
        max_length=255,
        default="Replies within 48 hours · Studio in Bangalore · Travels worldwide"
    )

    def __str__(self):
        return "CTA Booking Section"


class Enquiry(models.Model):
    email = models.EmailField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.email} ({self.created_at.strftime('%Y-%m-%d')})"     

class FAQSection(SingletonModel):
    eyebrow_text = models.CharField(max_length=100, default="Questions")
    heading = models.CharField(max_length=200, default="Good To Know")
    subtext = models.TextField(
        default="Everything couples and families ask us before the first frame. Anything else, just write — we answer personally."
    )

    def __str__(self):
        return "FAQ Section"


class FAQItem(models.Model):
    question = models.CharField(max_length=255)
    answer = models.TextField()
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.question     

class FooterSection(SingletonModel):
    tagline = models.TextField(
        default="An editorial photography studio shaped around natural light, quiet direction, and images that still feel true in twenty years."
    )

    def __str__(self):
        return "Footer Section"    